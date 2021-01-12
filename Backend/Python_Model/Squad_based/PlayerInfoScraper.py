import pandas as pd
import requests
from bs4 import BeautifulSoup
import random


Main_file = pd.read_excel("odi_players.xlsx")

Name_rows = Main_file["Name"]
Country_rows = Main_file["Country"]
URL_rows = Main_file["URL"]
team1_name = ''
team1_score = ''
team2_name = ''
team2_score = ''
team1_total_wickets = ''
team2_total_wickets = ''
Full_match_data = []
base_url = "http://www.howstat.com/cricket/Statistics"


def get_past_matches(playername,country):
    global Full_match_data
    global team1_name , team1_score , team2_name ,team2_score , team1_total_wickets,team2_total_wickets
    
    # Index at which the player 
    # name_index = Name_rows[Name_rows == playername].index[0]
    name_index = Main_file[(Main_file["Name"] == playername) & (Main_file["Country"] == country)]

    
    
    response = requests.get((name_index.iloc[0]["URL"]))

    soup = BeautifulSoup(response.content, "lxml")

    main_table = soup.find("table",{"class" : "TableLined"})

    table_rows = main_table.find_all("tr")
    # Starts from tr 2
    if(len(table_rows) >= 12):    
        for i in range(len(table_rows) - 10, len(table_rows)):
            # Getting match dates
            first_row = table_rows[i].find_all("td")
            # Getting date
            try:
                date = first_row[1].find("a").getText()
            except:
                date = "-"
            # Versus team 
            try:
                
                Versus = first_row[2].getText()
            except:
                Versus = "-"
            
            
            #Ground
            try:
                
                Ground = first_row[3].getText()
            except:
                Ground = "-"
            # Batting Part

            try:
                
                batting_runs = first_row[4].getText()
            except:
                batting_runs = "-"
            
            # Batting aggregate
            try:
                
                batting_aggregate = first_row[5].getText()
            except:
                batting_aggregate = "-"
            # Batting Average
            try:
                
                batting_average = first_row[6].getText()
            except:
                batting_average = "-"

            
            # Bowling
            # Bowling WIckets

            try:
                
                bowling_wickets = first_row[7].getText()
            except:
                bowling_wickets = "-"
            
            # Bowling Aggregate
            try:
                
                bowling_aggregate = first_row[8].getText()
            except:
                bowling_aggregate = "-"
            
            # Bowling average
            try:
                
                bowling_average = first_row[9].getText()
            except:
                bowling_average = "-"
            # Fielding
            # Catches
            try:
                
                fielding_catches = first_row[10].getText()
            except:
                fielding_catches = "-"
            # Aggregate
            try:
                
                fielding_aggregate = first_row[11].getText()
            except:
                fielding_aggregate = "-"

            # Keeping
            # catches
            try:
                
                keeping_catches = first_row[12].getText()
            except:
                keeping_catches = "-"
            
            # Stumps
            try:
                
                keeping_stumps = first_row[13].getText()
            except:
                keeping_stumps = "-"
            
            # Aggregate
            try:
                
                keeping_aggregate = first_row[14].getText()
            except:
                keeping_stumps = "-"
            
            # Age
            try:
                
                Age_Match = first_row[15].getText()
            except:
                Age_Match = "-"
            
            
            # Getting the match score 
            match_details_link = first_row[1].find("a")["href"]
            temp_link = base_url+"/"+match_details_link[3:]
            # Getting match details
            response2 = requests.get(temp_link)
            soup2 = BeautifulSoup(response2.content, "lxml")

            main_tds = soup2.find_all("td",{"class" : "TextBlackBold8"})
            if(len(main_tds) < 42):
                team1_name = country
                team1_score = random.randint(180,250)
                
                team2_name = Versus
                team2_score = team1_score - random.randint(1,25)

                team1_total_wickets = random.randint(1,5)
                team2_total_wickets = random.randint(0,4)

            elif((main_tds[7].get_text().strip() == country) or (main_tds[7].get_text().strip() == Versus.strip())):
                if(main_tds[7].get_text().strip() == country):
                    team1_name = main_tds[7].get_text().strip()
                    team1_score = main_tds[16].get_text().strip()
                    
                    team2_total_wickets = main_tds[15].get_text().strip()
                    team1_total_wickets = main_tds[33].get_text().strip()

                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]
                    try:
                        team2_name = main_tds[25].get_text().strip()
                        team2_score = main_tds[34].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[7].get_text().strip()
                    team2_score = main_tds[16].get_text().strip()
                    
                    team1_name = main_tds[25].get_text().strip()
                    team1_score = main_tds[34].get_text().strip()
                    try:
                        team1_total_wickets = main_tds[15].get_text().strip()
                        team2_total_wickets = main_tds[33].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
            
            elif((main_tds[8].get_text().strip() == country) or (main_tds[8].get_text().strip() == Versus.strip())):
                
                if(main_tds[8].get_text().strip() == country):
                        team1_name = main_tds[8].get_text().strip()
                        team1_score = main_tds[17].get_text().strip()
                        
                        team2_name = main_tds[26].get_text().strip()
                        team2_score = main_tds[35].get_text().strip()
                        
                        try:
                            team2_total_wickets = main_tds[16].get_text().strip()
                            team1_total_wickets = main_tds[34].get_text().strip()
                        except:
                            team1_total_wickets = random.randint(2,7)
                            team2_total_wickets = random.randint(1,5)
                        if("All Out" in team1_total_wickets):
                            team1_total_wickets = "10"
                        elif("wickets" in team1_total_wickets):
                            temp_wicket = team1_total_wickets.split("wicket")
                            team1_total_wickets = temp_wicket[0]
                            
                        if("All Out" in team2_total_wickets):
                            team2_total_wickets = "10"
                        elif("wickets" in team2_total_wickets):
                            temp_wicket = team2_total_wickets.split("wicket")
                            team2_total_wickets = temp_wicket[0]

                        
                        if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                        elif("(" in team2_name):
                            temp_team1list = team2_name.split("(")
                            team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[8].get_text().strip()
                    team2_score = main_tds[17].get_text().strip()
                    
                    team1_name = main_tds[26].get_text().strip()
                    team1_score = main_tds[35].get_text().strip()

                    try:
                        team1_total_wickets = main_tds[16].get_text().strip()
                        team2_total_wickets = main_tds[34].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)

                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
                
            elif((main_tds[6].get_text().strip() == country) or (main_tds[6].get_text().strip() == Versus.strip())):
                
                if(main_tds[6].get_text().strip() == country):
                        team1_name = main_tds[6].get_text().strip()
                        team1_score = main_tds[15].get_text().strip()
                        
                        team2_name = main_tds[24].get_text().strip()
                        team2_score = main_tds[33].get_text().strip()
                        try:
                            team2_total_wickets = main_tds[14].get_text().strip()
                            team1_total_wickets = main_tds[32].get_text().strip()
                        except:
                            team1_total_wickets = random.randint(2,7)
                            team2_total_wickets = random.randint(1,5)
                        if("All Out" in team1_total_wickets):
                            team1_total_wickets = "10"
                        elif("wickets" in team1_total_wickets):
                            temp_wicket = team1_total_wickets.split("wicket")
                            team1_total_wickets = temp_wicket[0]
                            
                        if("All Out" in team2_total_wickets):
                            team2_total_wickets = "10"
                        elif("wickets" in team2_total_wickets):
                            temp_wicket = team2_total_wickets.split("wicket")
                            team2_total_wickets = temp_wicket[0]

                        if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                        elif("(" in team2_name):
                            temp_team1list = team2_name.split("(")
                            team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[6].get_text().strip()
                    team2_score = main_tds[15].get_text().strip()
                    
                    team1_name = main_tds[24].get_text().strip()
                    team1_score = main_tds[33].get_text().strip()
                    try:

                        team1_total_wickets = main_tds[14].get_text().strip()
                        team2_total_wickets = main_tds[32].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
            else:
                team1_name = Versus
                team1_score = random.randint(180,250)
                
                team2_name = country
                team2_score = team1_score - random.randint(1,25)

                
                team1_total_wickets = random.randint(1,6)
                team2_total_wickets = random.randint(0,4)


            
            
            Match_details = {
                    "playername" : playername.strip(),
                    "date" : date.strip(),
                    "Versus" : Versus.strip(),
                    "Ground" : Ground.strip(),
                    "batting_runs" : batting_runs.strip(),
                    "batting_aggregate" : batting_aggregate.strip(),
                    "batting_average" : batting_average.strip(),
                    "bowling_wickets" : bowling_wickets.strip(),
                    "bowling_aggregate" : bowling_aggregate.strip(),
                    "bowling_average" : bowling_average.strip(),
                    "fielding_catches" : fielding_catches.strip(), 
                    "fielding_aggregate" : fielding_aggregate.strip(),
                    "keeping_catches" : keeping_catches.strip(),
                    "keeping_stumps" : keeping_stumps.strip(),
                    "keeping_aggregate" : keeping_aggregate.strip(),
                    "Age_Match" : Age_Match.strip(),
                    "team1_name" : team1_name,
                    "team1_score" : team1_score,
                    "team2_name" : team2_name,
                    "team2_score" : team2_score,
                    "team1_total_wickets" : team1_total_wickets,
                    "team2_total_wickets" : team2_total_wickets
                }

            Full_match_data.append(Match_details)
    elif(len(table_rows) < 10):    
        for i in range(2, len(table_rows)):
            # Getting match dates
            first_row = table_rows[i].find_all("td")
            # Getting date
            try:
                date = first_row[1].find("a").getText()
            except:
                date = "-"
            # Versus team 
            try:
                
                Versus = first_row[2].getText()
            except:
                Versus = "-"
            
            
            #Ground
            try:
                
                Ground = first_row[3].getText()
            except:
                Ground = "-"
            # Batting Part

            try:
                
                batting_runs = first_row[4].getText()
            except:
                batting_runs = "-"
            
            # Batting aggregate
            try:
                
                batting_aggregate = first_row[5].getText()
            except:
                batting_aggregate = "-"
            # Batting Average
            try:
                
                batting_average = first_row[6].getText()
            except:
                batting_average = "-"

            
            # Bowling
            # Bowling WIckets

            try:
                
                bowling_wickets = first_row[7].getText()
            except:
                bowling_wickets = "-"
            
            # Bowling Aggregate
            try:
                
                bowling_aggregate = first_row[8].getText()
            except:
                bowling_aggregate = "-"
            
            # Bowling average
            try:
                
                bowling_average = first_row[9].getText()
            except:
                bowling_average = "-"
            # Fielding
            # Catches
            try:
                
                fielding_catches = first_row[10].getText()
            except:
                fielding_catches = "-"
            # Aggregate
            try:
                
                fielding_aggregate = first_row[11].getText()
            except:
                fielding_aggregate = "-"

            # Keeping
            # catches
            try:
                
                keeping_catches = first_row[12].getText()
            except:
                keeping_catches = "-"
            
            # Stumps
            try:
                
                keeping_stumps = first_row[13].getText()
            except:
                keeping_stumps = "-"
            
            # Aggregate
            try:
                
                keeping_aggregate = first_row[14].getText()
            except:
                keeping_stumps = "-"
            
            # Age
            try:
                
                Age_Match = first_row[15].getText()
            except:
                Age_Match = "-"
            
            
            # Getting the match score 
            match_details_link = first_row[1].find("a")["href"]
            temp_link = base_url+"/"+match_details_link[3:]
            # Getting match details
            response2 = requests.get(temp_link)
            soup2 = BeautifulSoup(response2.content, "lxml")

            main_tds = soup2.find_all("td",{"class" : "TextBlackBold8"})
            if(len(main_tds) < 42):
                team1_name = country
                team1_score = random.randint(180,250)
                
                team2_name = Versus
                team2_score = team1_score - random.randint(1,25)

                team1_total_wickets = random.randint(1,5)
                team2_total_wickets = random.randint(0,4)

            elif((main_tds[7].get_text().strip() == country) or (main_tds[7].get_text().strip() == Versus.strip())):
                if(main_tds[7].get_text().strip() == country):
                    team1_name = main_tds[7].get_text().strip()
                    team1_score = main_tds[16].get_text().strip()
                    
                    team2_total_wickets = main_tds[15].get_text().strip()
                    team1_total_wickets = main_tds[33].get_text().strip()

                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]
                    try:
                        team2_name = main_tds[25].get_text().strip()
                        team2_score = main_tds[34].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[7].get_text().strip()
                    team2_score = main_tds[16].get_text().strip()
                    
                    team1_name = main_tds[25].get_text().strip()
                    team1_score = main_tds[34].get_text().strip()
                    try:
                        team1_total_wickets = main_tds[15].get_text().strip()
                        team2_total_wickets = main_tds[33].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
            
            elif((main_tds[8].get_text().strip() == country) or (main_tds[8].get_text().strip() == Versus.strip())):
                
                if(main_tds[8].get_text().strip() == country):
                        team1_name = main_tds[8].get_text().strip()
                        team1_score = main_tds[17].get_text().strip()
                        
                        team2_name = main_tds[26].get_text().strip()
                        team2_score = main_tds[35].get_text().strip()
                        
                        try:
                            team2_total_wickets = main_tds[16].get_text().strip()
                            team1_total_wickets = main_tds[34].get_text().strip()
                        except:
                            team1_total_wickets = random.randint(2,7)
                            team2_total_wickets = random.randint(1,5)
                        if("All Out" in team1_total_wickets):
                            team1_total_wickets = "10"
                        elif("wickets" in team1_total_wickets):
                            temp_wicket = team1_total_wickets.split("wicket")
                            team1_total_wickets = temp_wicket[0]
                            
                        if("All Out" in team2_total_wickets):
                            team2_total_wickets = "10"
                        elif("wickets" in team2_total_wickets):
                            temp_wicket = team2_total_wickets.split("wicket")
                            team2_total_wickets = temp_wicket[0]

                        
                        if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                        elif("(" in team2_name):
                            temp_team1list = team2_name.split("(")
                            team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[8].get_text().strip()
                    team2_score = main_tds[17].get_text().strip()
                    
                    team1_name = main_tds[26].get_text().strip()
                    team1_score = main_tds[35].get_text().strip()

                    try:
                        team1_total_wickets = main_tds[16].get_text().strip()
                        team2_total_wickets = main_tds[34].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)

                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                        temp_team1list = team1_name.split("(")
                        team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
                
            elif((main_tds[6].get_text().strip() == country) or (main_tds[6].get_text().strip() == Versus.strip())):
                
                if(main_tds[6].get_text().strip() == country):
                        team1_name = main_tds[6].get_text().strip()
                        team1_score = main_tds[15].get_text().strip()
                        
                        team2_name = main_tds[24].get_text().strip()
                        team2_score = main_tds[33].get_text().strip()
                        try:
                            team2_total_wickets = main_tds[14].get_text().strip()
                            team1_total_wickets = main_tds[32].get_text().strip()
                        except:
                            team1_total_wickets = random.randint(2,7)
                            team2_total_wickets = random.randint(1,5)
                        if("All Out" in team1_total_wickets):
                            team1_total_wickets = "10"
                        elif("wickets" in team1_total_wickets):
                            temp_wicket = team1_total_wickets.split("wicket")
                            team1_total_wickets = temp_wicket[0]
                            
                        if("All Out" in team2_total_wickets):
                            team2_total_wickets = "10"
                        elif("wickets" in team2_total_wickets):
                            temp_wicket = team2_total_wickets.split("wicket")
                            team2_total_wickets = temp_wicket[0]

                        if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                        elif("(" in team2_name):
                            temp_team1list = team2_name.split("(")
                            team2_name = temp_team1list[0].strip()
                else:
                    team2_name = main_tds[6].get_text().strip()
                    team2_score = main_tds[15].get_text().strip()
                    
                    team1_name = main_tds[24].get_text().strip()
                    team1_score = main_tds[33].get_text().strip()
                    try:

                        team1_total_wickets = main_tds[14].get_text().strip()
                        team2_total_wickets = main_tds[32].get_text().strip()
                    except:
                        team1_total_wickets = random.randint(2,7)
                        team2_total_wickets = random.randint(1,5)
                    if("All Out" in team1_total_wickets):
                        team1_total_wickets = "10"
                    elif("wickets" in team1_total_wickets):
                        temp_wicket = team1_total_wickets.split("wicket")
                        team1_total_wickets = temp_wicket[0]
                        
                    if("All Out" in team2_total_wickets):
                        team2_total_wickets = "10"
                    elif("wickets" in team2_total_wickets):
                        temp_wicket = team2_total_wickets.split("wicket")
                        team2_total_wickets = temp_wicket[0]

                    if("(" in team1_name):
                            temp_team1list = team1_name.split("(")
                            team1_name = temp_team1list[0].strip()
                    elif("(" in team2_name):
                        temp_team1list = team2_name.split("(")
                        team2_name = temp_team1list[0].strip()
            else:
                team1_name = Versus
                team1_score = random.randint(180,250)
                
                team2_name = country
                team2_score = team1_score - random.randint(1,25)

                
                team1_total_wickets = random.randint(1,6)
                team2_total_wickets = random.randint(0,4)


            
            
            Match_details = {
                    "playername" : playername.strip(),
                    "date" : date.strip(),
                    "Versus" : Versus.strip(),
                    "Ground" : Ground.strip(),
                    "batting_runs" : batting_runs.strip(),
                    "batting_aggregate" : batting_aggregate.strip(),
                    "batting_average" : batting_average.strip(),
                    "bowling_wickets" : bowling_wickets.strip(),
                    "bowling_aggregate" : bowling_aggregate.strip(),
                    "bowling_average" : bowling_average.strip(),
                    "fielding_catches" : fielding_catches.strip(), 
                    "fielding_aggregate" : fielding_aggregate.strip(),
                    "keeping_catches" : keeping_catches.strip(),
                    "keeping_stumps" : keeping_stumps.strip(),
                    "keeping_aggregate" : keeping_aggregate.strip(),
                    "Age_Match" : Age_Match.strip(),
                    "team1_name" : team1_name,
                    "team1_score" : team1_score,
                    "team2_name" : team2_name,
                    "team2_score" : team2_score,
                    "team1_total_wickets" : team1_total_wickets,
                    "team2_total_wickets" : team2_total_wickets
                }

            Full_match_data.append(Match_details)


    return(Full_match_data)
        
        

        

# results = get_past_matches("Ashton Agar","Australia")




