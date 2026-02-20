import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import { teams } from '../data/teams.js';
import { styles } from '../styles/styles.js';

export default function SelectionScreen({ navigation }) {
  const [homeTeamIndex, setHomeTeamIndex] = useState(0);
  const [awayTeamIndex, setAwayTeamIndex] = useState(1);

  const homeTeam = teams[homeTeamIndex];
  const awayTeam = teams[awayTeamIndex];

  const changeHomeTeam = () => setHomeTeamIndex((prev) => (prev + 1) % teams.length);
  const changeAwayTeam = () => setAwayTeamIndex((prev) => (prev + 1) % teams.length);

  const startGame = () => {
    navigation.navigate('Match', { homeTeam, awayTeam });
  };

  const renderLogo = (team) => {
    if (team.logoImage) {
      return <Image source={team.logoImage} style={styles.logoImage} resizeMode="contain" />;
    }
    return <Text style={styles.logo}>{team.logo}</Text>;
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerName}>{item.name} - {item.position}</Text>
      <Text style={styles.playerNumber}>#{item.number}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <View style={styles.safeArea}>
        <View style={styles.selectionScreen}>
          <Text style={styles.title}>🏀 NBA JAM 90's 🏀</Text>
          
          <View style={styles.teamsContainer}>
            <View style={[styles.teamSection, styles.teamSectionHome]}>
              <Text style={[styles.teamLabel, styles.teamLabelHome]}>LOCAL</Text>
              <View style={styles.logoContainer}>
                {renderLogo(homeTeam)}
                <Text style={styles.teamName}>{homeTeam.name}</Text>
              </View>
              <TouchableOpacity style={styles.changeButton} onPress={changeHomeTeam}>
                <Text style={styles.changeButtonText}>CAMBIAR EQUIPO</Text>
              </TouchableOpacity>
              <Text style={styles.playersTitle}>QUINTETO INICIAL:</Text>
              <FlatList
                data={homeTeam.players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id.toString()}
                style={styles.playersList}
              />
            </View>

            <View style={[styles.teamSection, styles.teamSectionAway]}>
              <Text style={[styles.teamLabel, styles.teamLabelAway]}>VISITANTE</Text>
              <View style={styles.logoContainer}>
                {renderLogo(awayTeam)}
                <Text style={styles.teamName}>{awayTeam.name}</Text>
              </View>
              <TouchableOpacity style={styles.changeButton} onPress={changeAwayTeam}>
                <Text style={styles.changeButtonText}>CAMBIAR EQUIPO</Text>
              </TouchableOpacity>
              <Text style={styles.playersTitle}>QUINTETO INICIAL:</Text>
              <FlatList
                data={awayTeam.players}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.id.toString()}
                style={styles.playersList}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>JUGAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}