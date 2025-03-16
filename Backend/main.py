from hit_predictor import * 
from tensorflow.keras.models import load_model
from gensim.models import Word2Vec
from tensorflow.keras.preprocessing.sequence import pad_sequences
import joblib



class Predictor:
    
    def __init__(self):
        self.loaded_model = load_model('lyrics_model.h5')
        self.loaded_word2vec = Word2Vec.load('lyrics_word2vec.model')
        self.loaded_tokenizer = joblib.load('lyrics_tokenizer.pkl')


    def get_success(self,lyrics, max_len = 100):
        
        text = clean_lyrics(lyrics)
        text = expand_contractions(text)
        text = remove_stopwords(text)
        
        new_lyrics_tokenized = self.loaded_tokenizer.texts_to_sequences([text])
        new_lyrics_padded = pad_sequences(new_lyrics_tokenized, padding='post', maxlen=max_len)
        
        prediction = self.loaded_model.predict(new_lyrics_padded)[0][0] # extract the probability
        return prediction

