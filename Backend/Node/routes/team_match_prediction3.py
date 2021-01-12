# -*- coding: utf-8 -*-
"""Team_Match_Prediction.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1L-SVWgLyO0vY-0UmsRIXYgCEjc-CR0pZ
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib.ticker as ticker
import matplotlib.ticker as plticker
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier

import io
import sys

results = pd.read_csv('final_Match_results.csv')

results.head()

worldcup_teams = ['England', 'South Africa', 'India', 'West Indies', 
            'Pakistan', 'New Zealand', 'Sri Lanka', 'Afghanistan', 
            'Australia', 'Bangladesh', 'India','Bermuda','Canada', 'Hong Kong',
            'Ireland','Kenya','Namibia','Netherlands','Oman','P.N.G.','Scotland',
            'U.A.E.','U.S.A.','Zimbabwe']

df_teams_1 = results[results['Team_1'].isin(worldcup_teams)]
df_teams_2 = results[results['Team_2'].isin(worldcup_teams)]
df_teams = pd.concat((df_teams_1, df_teams_2))
df_teams.drop_duplicates()
df_teams.count()

df_teams.head()

df_teams_2010 = df_teams.drop(['date','Margin', 'Ground'], axis=1)
df_teams_2010.head()

df_teams_2010.count()

"""###Feature Engineering"""

# If Team 1 Won, assign Label 1, else, Assign Label 2

df_teams_2010 = df_teams_2010.reset_index(drop=True)
df_teams_2010.loc[df_teams_2010.Winner == df_teams_2010.Team_1,'winning_team']=1
df_teams_2010.loc[df_teams_2010.Winner == df_teams_2010.Team_2, 'winning_team']=2
df_teams_2010 = df_teams_2010.drop(['winning_team'], axis=1)

df_teams_2010.head()

# converting team-1 and team-2 from categorical variables to continuous inputs using pandas function pd.get_dummies
#  The dataframe consists of zeros and ones. The dataframe will have a one depending on the team of a particular game in this case.
# training and test sets with 70% and 30% in training and validation sets


final = pd.get_dummies(df_teams_2010, prefix=['Team_1', 'Team_2'], columns=['Team_1', 'Team_2'])

X = final.drop(['Winner'], axis=1)
y = final["Winner"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42)

rf = RandomForestClassifier(n_estimators=100, max_depth=20,random_state=0) 
rf.fit(X_train, y_train)
score = rf.score(X_train, y_train)
score2 = rf.score(X_test, y_test)
# This if for checking accuracy
# print("Training set accuracy: {} %".format(score * 100))
# print("Test set accuracy: : {} %".format(score2 * 100))


ranking = pd.read_csv('ODI_rankings.csv') 
fixtures = pd.read_csv('Fixtures.csv')
pred_set = []

ranking.head()

fixtures.head()

fixtures.insert(1, 'first_position', fixtures['Team_1'].map(ranking['Position']))
fixtures.insert(2, 'second_position', fixtures['Team_2'].map(ranking['Position']))
# fixtures = fixtures.loc[~fixtures.index.duplicated(keep='first')]

fixtures.tail()

for index, row in fixtures.iterrows():
    if row['first_position'] < row['second_position']:
        pred_set.append({'Team_1': row['Team_1'], 'Team_2': row['Team_2'], 'winning_team': None})
    else:
        pred_set.append({'Team_1': row['Team_2'], 'Team_2': row['Team_1'], 'winning_team': None})
        
pred_set = pd.DataFrame(pred_set)
backup_pred_set = pred_set
pred_set.head()

pred_set = pd.get_dummies(pred_set, prefix=['Team_1', 'Team_2'], columns=['Team_1', 'Team_2'])

missing_cols = set(final.columns) - set(pred_set.columns)
for c in missing_cols:
    pred_set[c] = 0
pred_set = pred_set[final.columns]


pred_set = pred_set.drop(['Winner'], axis=1)
pred_set.head()

predictions = rf.predict(pred_set)
# for i in range(fixtures.shape[0]):
#     print(backup_pred_set.iloc[i, 1] + " and " + backup_pred_set.iloc[i, 0])
#     if predictions[i] == 1:
#         print("Winner: " + backup_pred_set.iloc[i, 1])
    
#     else:
#         print("Winner: " + backup_pred_set.iloc[i, 0])
#     print("")

def clean_and_predict(matches, ranking, final, logreg):

    # Initialization of auxiliary list for data cleaning
    positions = []

    # Loop to retrieve each team's position according to ICC ranking
    for match in matches:
        positions.append(ranking.loc[ranking['Team'] == match[0],'Position'].iloc[0])
        positions.append(ranking.loc[ranking['Team'] == match[1],'Position'].iloc[0])
    
    # Creating the DataFrame for prediction
    pred_set = []

    # Initializing iterators for while loop
    i = 0
    j = 0

    # 'i' will be the iterator for the 'positions' list, and 'j' for the list of matches (list of tuples)
    while i < len(positions):
        dict1 = {}

        # If position of first team is better then this team will be the 'Team_1' team, and vice-versa
        if positions[i] < positions[i + 1]:
            dict1.update({'Team_1': matches[j][0], 'Team_2': matches[j][1]})
        else:
            dict1.update({'Team_1': matches[j][1], 'Team_2': matches[j][0]})

        # Append updated dictionary to the list, that will later be converted into a DataFrame
        pred_set.append(dict1)
        i += 2
        j += 1
        
        # Convert list into DataFrame
    pred_set = pd.DataFrame(pred_set)
    backup_pred_set = pred_set

    # Get dummy variables and drop winning_team column
    pred_set = pd.get_dummies(pred_set, prefix=['Team_1', 'Team_2'], columns=['Team_1', 'Team_2'])

    # Add missing columns compared to the model's training dataset
    missing_cols2 = set(final.columns) - set(pred_set.columns)
    for c in missing_cols2:
        pred_set[c] = 0
    pred_set = pred_set[final.columns]

    pred_set = pred_set.drop(['Winner'], axis=1)

    # Predict!
    predictions = logreg.predict(pred_set)
    final_answer = {}
    for i in range(len(pred_set)):
        final_answer["Team1"] = backup_pred_set.iloc[i, 1]
        final_answer["Team2"] = backup_pred_set.iloc[i, 0]
        # print(backup_pred_set.iloc[i, 1] + " and " + backup_pred_set.iloc[i, 0])
        if predictions[i] == 1:
            # print("Winner: " + backup_pred_set.iloc[i, 1])
            final_answer["Winner"] = backup_pred_set.iloc[i, 1]
        else:
            # print("Winner: " + backup_pred_set.iloc[i, 0])
            final_answer["Winner"] = backup_pred_set.iloc[i, 0]
        # print(final_answer["Team1"])
        # print(final_answer["Team2"])
        print(final_answer["Winner"])
        sys.stdout.flush()
        # return(final_answer["Winner"])
        # print("")
        # 

# Semi = the Two teams to Face Each other

# team_1 = sys.argv[1]
# team_2 = sys.argv[2]

# semi = [('Ireland','U.A.E.')]
# semi = [(team_1,team_2)]
# clean_and_predict(semi, ranking, final, rf)

def starting_func(team1,team2):
    semi = [(team1,team2)]
    clean_and_predict(semi, ranking, final, rf)


team_1 = sys.argv[1]
team_2 = sys.argv[2]

starting_func(team_1,team_2)

semi = [(team_1,team_2)]



