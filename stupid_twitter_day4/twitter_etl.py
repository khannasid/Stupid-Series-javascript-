from dotenv.main import load_dotenv # used for the environment variables
import os # used for environment variables
import tweepy # twitter python library
import pandas as pd # for dealing with json and csv data.
import json
from datetime import datetime

load_dotenv()
access_key = os.environ['API_KEY']
access_secret = os.environ['API_KEY_SECRET']
consumer_key = os.environ['ACCESS_TOKEN']
consumer_secret = os.environ['ACCESS_TOKEN_SECRET']

#auth twitter 
auth = tweepy.OAuthHandler(access_key, access_secret)
auth.set_access_token(consumer_key,consumer_secret)

# Establishing API
api = tweepy.API(auth)

tweets = api.user_timeline(screen_name = '@elonmusk',
                            count = 10,
                            include_rts = False,
                            tweet_mode = 'extended'
                            )
tweet_list = []
for tweet in tweets:
    text = tweet._json["full_text"]

    refined_tweet = {"user":tweet.user.screen_name,
                    'text':text, #the real content
                    'favourite_count':tweet.favorite_count, #likes
                    'retweet_count': tweet.retweet_count, # retweets
                    'created_at': tweet.created_at} #time of creation
    tweet_list.append(refined_tweet)

df = pd.DataFrame(tweet_list)
df.to_csv("stupid_elon_tweets.csv")
print(username + "CSV file is created successfully!!!")