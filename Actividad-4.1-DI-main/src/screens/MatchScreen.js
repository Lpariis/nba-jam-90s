import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { calcularNuevoMarcador } from '../utils/rules.js';
import { styles } from '../styles/styles.js';

export default function MatchScreen({ navigation, route }) {
  const { homeTeam, awayTeam } = route.params;
  
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  
  const [homeStats, setHomeStats] = useState(
    homeTeam.players.map(p => ({ ...p, puntos: 0 }))
  );
  const [awayStats, setAwayStats] = useState(
    awayTeam.players.map(p => ({ ...p, puntos: 0 }))
  );

  const addPoints = (playerIndex, points, isHome) => {
    if (isHome) {
      setHomeScore(calcularNuevoMarcador(homeScore, points));
      setHomeStats(prev => prev.map((p, i) => 
        i === playerIndex ? { ...p, puntos: calcularNuevoMarcador(p.puntos, points) } : p
      ));
    } else {
      setAwayScore(calcularNuevoMarcador(awayScore, points));
      setAwayStats(prev => prev.map((p, i) => 
        i === playerIndex ? { ...p, puntos: calcularNuevoMarcador(p.puntos, points) } : p
      ));
    }
  };

  const endGame = () => {
    navigation.navigate('Winner', {
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      estadisticas: { home: homeStats, away: awayStats }
    });
  };

  const renderLogo = (team) => {
    if (team.logoImage) {
      return <Image source={team.logoImage} style={styles.matchTeamLogoImage} resizeMode="contain" />;
    }
    return <Text style={styles.matchTeamLogo}>{team.logo}</Text>;
  };

  const renderPlayer = (player, index, isHome) => (
    <View key={player.id} style={[styles.matchPlayerItem, isHome ? styles.matchPlayerItemHome : styles.matchPlayerItemAway]}>
      <View style={styles.matchPlayerInfo}>
        <Text style={styles.matchPlayerName}>{player.name} - {player.position}</Text>
        <Text style={styles.matchPlayerNumber}>#{player.number}</Text>
      </View>
      <Text style={styles.matchPlayerPoints}>{isHome ? homeStats[index].puntos : awayStats[index].puntos} PTS</Text>
      <View style={styles.matchPlayerButtons}>
        <TouchableOpacity 
          style={[styles.scoreButton, styles.scoreButton2]}
          onPress={() => addPoints(index, 2, isHome)}
        >
          <Text style={styles.scoreButtonText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.scoreButton, styles.scoreButton3]}
          onPress={() => addPoints(index, 3, isHome)}
        >
          <Text style={styles.scoreButtonText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <View style={styles.safeArea}>
        <View style={styles.matchScreen}>
          <Text style={styles.matchTitle}>⚡ LIVE MATCH ⚡</Text>
          
          <View style={styles.matchScoreboard}>
            <View style={styles.matchScoreRow}>
              <View style={styles.matchTeamInfo}>
                {renderLogo(homeTeam)}
                <Text style={styles.matchTeamName} numberOfLines={2}>{homeTeam.name}</Text>
              </View>
              <View style={styles.matchScoreBox}>
                <Text style={styles.matchScore}>{homeScore}</Text>
              </View>
              <Text style={styles.matchVsText}>VS</Text>
              <View style={styles.matchScoreBox}>
                <Text style={styles.matchScore}>{awayScore}</Text>
              </View>
              <View style={styles.matchTeamInfo}>
                {renderLogo(awayTeam)}
                <Text style={styles.matchTeamName} numberOfLines={2}>{awayTeam.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.playersContainer}>
            <ScrollView style={styles.playerColumn}>
              <Text style={[styles.playerColumnTitle, styles.playerColumnTitleHome]}>{homeTeam.name}</Text>
              {homeTeam.players.map((player, index) => renderPlayer(player, index, true))}
            </ScrollView>

            <ScrollView style={styles.playerColumn}>
              <Text style={[styles.playerColumnTitle, styles.playerColumnTitleAway]}>{awayTeam.name}</Text>
              {awayTeam.players.map((player, index) => renderPlayer(player, index, false))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.endGameButton} onPress={endGame}>
            <Text style={styles.endGameButtonText}>FIN DEL JUEGO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}