from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from collections import defaultdict
from collections import defaultdict
from sklearn.metrics import euclidean_distances
from sklearn.preprocessing import StandardScaler
from scipy.spatial.distance import cdist
import difflib
import pandas as pd
import numpy as np
import json

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="40035a13c834489dba32727384957b99",
                                                           client_secret="73b506ba04c648f68c1891cd24dc7230"))
data = pd.read_csv("clustered_tracks.csv")
data1 = pd.read_csv('data_o.csv')
df = pd.read_csv('tracks.csv')
artists = pd.read_csv('data_by_artist_o.csv')
sc = StandardScaler()
X = data1.select_dtypes(np.number)
sc.fit(X)


def find_song(name, year):
    song_data = defaultdict()
    results = sp.search(q= 'track: {} year: {}'.format(name,year), limit=1)
    if results['tracks']['items'] == []:
        return None
    results = results['tracks']['items'][0]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0]

    song_data['name'] = [name]
    song_data['year'] = [year]
    song_data['explicit'] = [int(results['explicit'])]
    song_data['duration_ms'] = [results['duration_ms']]
    song_data['popularity'] = [results['popularity']]

    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data)

number_cols = ['valence', 'year', 'acousticness', 'danceability', 'duration_ms', 'energy', 'explicit',
 'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'popularity', 'speechiness', 'tempo']


def get_song_data(song, spotify_data):
    
    try:
        song_data = spotify_data[(spotify_data['name'] == song['name']) 
                                & (spotify_data['year'] == song['year'])].iloc[0]
        return song_data
    
    except IndexError:
        return find_song(song['name'], song['year'])
        

def get_mean_vector(song_list, spotify_data):
    
    song_vectors = []
    
    for song in song_list:
        song_data = get_song_data(song, spotify_data)
        if song_data is None:
            print('Warning: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)  
    
    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)


def flatten_dict_list(dict_list):
    
    flattened_dict = defaultdict()
    for key in dict_list[0].keys():
        flattened_dict[key] = []
    
    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)
            
    return flattened_dict


def recommend_songs( song_list, spotify_data, n_songs):
    
    metadata_cols = ['name', 'year', 'artists']
    song_dict = flatten_dict_list(song_list)
    
    song_center = get_mean_vector(song_list, spotify_data)
    scaler = sc
    scaled_data = scaler.transform(spotify_data[number_cols])
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    index = list(np.argsort(distances)[:, :n_songs][0])
    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]
    return rec_songs[metadata_cols].to_dict(orient='records')

def refreshSongs(songs):
    res = []
    for i in songs:
        if(i['duration'] >= 40):
            res.append(i)
    return res


def get_songs_by_artist(artist):
    response = []
    for index,i in df.iterrows():
        if(artist in i['artists']):
            response.append(i)
    ab = pd.DataFrame(response).sort_values(by = 'popularity', ascending = False)
    return ab.to_json(orient = 'records')

def get_song_by_name(name):
    ab = data[data.name == name]
    if(ab.shape[0] > 0):
        return ab.to_json(orient = "records")
    else:
        return {'message':'No such song'}

def get_artists_of_songs(songs):
    artists = []
    count = []
    for i in songs:
        dfx = df[df['name'] == i['name']].iloc[0]
        s = dfx['artists']
        s = s.replace("[",'')
        s = s.replace("]",'')
        s = s.replace("'",'')
        artists += s.split(",")
#         print(s)
    for i in artists:
        count.append({"name":i,"count":artists.count(i)})
    # count = list(set(count))
    y = [dict(t) for t in {tuple(d.items()) for d in count}]
    x = sorted(y, key = lambda i: i['count'], reverse = True)
    
    return x

def searchfunc(query):
    song = df[df['name'].str.lower().str.find(query.lower()) != -1]
    artist = artists[artists['artists'].str.lower().str.find(query.lower()) != -1]
    return {"songs":song.to_dict("records"),"artist":artist.to_dict("records")}


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def helloWorld():
    # print(recommend_songs([{'name': 'Come As You Are', 'year':1991},
    #             {'name': 'Smells Like Teen Spirit', 'year': 1991},
    #             {'name': 'Lithium', 'year': 1992},
    #             {'name': 'All Apologies', 'year': 1993},
    #             {'name': 'Stay Away', 'year': 1993},
    #             {'name': 'Life is a Highway - From "Cars"','year': 2009},
    #             {'name': 'Of Wolf And Man', 'year': 1991},
    #             {'name': 'Somebody Like You', 'year': 2002},
    #             {'name': 'Kayleigh', 'year': 1992}],  data))
    
    return "Hello, cross-origin-world!"


@app.route("/songs", methods=['POST'])
@cross_origin()
def recommendSongHandler():
    reqdata = json.loads(request.data)
    songs = reqdata['songs']
    
    number = reqdata['number']
    rs = recommend_songs(refreshSongs(songs),data,number)
    return jsonify({"songs":rs})


@app.route("/songname",methods=['POST'])
def getsong():
    reqdata  = json.loads(request.data)
    name = reqdata['name']
    # print(type()))
    return jsonify(json.loads(get_song_by_name(name)))

@app.route("/artists",methods=["POST"])
def getArtists():
    reqdata = json.loads(request.data)
    songs = reqdata['songs']
    return jsonify({"artists":get_artists_of_songs(songs)})

@app.route("/songsbyartist",methods=['POST'])
def getSongByArtist():
    reqdata = json.loads(request.data)
    artist = reqdata['artist'].strip()
    return jsonify(json.loads(get_songs_by_artist(artist)))
    
@app.route("/search", methods = ["POST"])
def search():
    reqdata = json.loads(request.data)
    query = reqdata['query']
    dictn = searchfunc(query)
    return jsonify(json.loads(json.dumps({"songs":dictn['songs'], "artists":dictn['artist']})))

if __name__ == '__main__':
    app.run(debug=True)
