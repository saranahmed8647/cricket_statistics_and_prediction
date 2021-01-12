# Contribution formulas 

# playercontribution = battingcontribution + bowlingcontribution  + fieldingcontribution

# battingcontribution = (playerscore / totalTeamScore) * 100

# bowlingcontribution = (playerwicket / totalTeamwickets) * 100
# fieldingcontribution = (playercatchcount / totalTeamCatchCount) * 100

import math

from PlayerInfoScraper import get_past_matches
batting_contributions = []
bowling_contributions = []
player_contributions = []
def Main_contirubtion(player_name,player_country):
    global batting_contributions, bowling_contributions,player_contributions
    results = get_past_matches(player_name, player_country)

    for result in results:
        # Batting Contribution
        if(result["team1_name"] == player_country):
            if((result["batting_runs"]) == "-"):
    
                batting_contribution = 0
                batting_contributions.append(batting_contribution)
            elif("*" in result["batting_runs"]):
                temp_val = result["batting_runs"].split("*")
                batting_contribution = (int(temp_val[0]) / int(result["team1_score"])) * 100
                batting_contributions.append(batting_contribution)
            else:
                batting_contribution = (int(result["batting_runs"]) / int(result["team1_score"])) * 100
                batting_contributions.append(batting_contribution)
        else:
            if((result["batting_runs"]) == "-"):
        
                batting_contribution = 0
                batting_contributions.append(batting_contribution)
            elif("*" in result["batting_runs"]):
                temp_val = result["batting_runs"].split("*")
                batting_contribution = (int(temp_val[0]) / int(result["team2_score"])) * 100
                batting_contributions.append(batting_contribution)
            else:
                batting_contribution = (int(result["batting_runs"]) / int(result["team2_score"])) * 100
                batting_contributions.append(batting_contribution)
        
        # Bowling contribution

        if(result["team1_name"] == player_country):
            if(("/" in result["bowling_wickets"])):
                temp_var = result["bowling_wickets"].split("/")[0]
                
                bowling_cont = (int(temp_var) / int(result["team1_total_wickets"])) * 100
                bowling_contributions.append(bowling_cont)
        else:
            if(("/" in result["bowling_wickets"])):
                temp_var = result["bowling_wickets"].split("/")[0]
                
                
                bowling_cont = (int(temp_var) / int(result["team2_total_wickets"])) * 100
                bowling_contributions.append(bowling_cont)
    
    for i in range(0,len(batting_contributions)):
        temp = batting_contributions[i] + bowling_contributions[i]
        player_contributions.append(temp)
    return(player_contributions)
result = Main_contirubtion("Ashton Agar" , "Australia")




