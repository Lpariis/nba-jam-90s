import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import { obtenerGanador, obtenerTop5Anotadores } from '../utils/rules.js';
import { styles } from '../styles/styles.js';

export default function WinnerScreen({ navigation, route }) {
  const { homeTeam, awayTeam, homeScore, awayScore, estadisticas } = route.params;
  
  const resultado = obtenerGanador(homeScore, awayScore, homeTeam, awayTeam);
  const top5 = obtenerTop5Anotadores(estadisticas);

  const renderWinnerLogo = (team) => {
    if (team.logoImage) {
      return <Image source={team.logoImage} style={styles.winnerLogoImage} resizeMode="contain" />;
    }
    return <Text style={styles.winnerLogo}>{team.logo}</Text>;
  };

  const renderTieLogo = (team) => {
    if (team.logoImage) {
      return <Image source={team.logoImage} style={styles.tieLogoImage} resizeMode="contain" />;
    }
    return <Text style={styles.tieLogo}>{team.logo}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Selection')}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.winnerScrollContent}>
        {resultado.empate ? (
          <View style={styles.winnerContainer}>
            <Text style={styles.tieTitle}>¡EMPATE!</Text>
            <View style={styles.tieLogosContainer}>
              <View>
                {renderTieLogo(homeTeam)}
                <Text style={styles.tieTeamName}>{homeTeam.name}</Text>
              </View>
              <View>
                {renderTieLogo(awayTeam)}
                <Text style={styles.tieTeamName}>{awayTeam.name}</Text>
              </View>
            </View>
            <Text style={styles.tieScore}>{homeScore} - {awayScore}</Text>
          </View>
        ) : (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerTitle}>¡GANADOR!</Text>
            {renderWinnerLogo(resultado.ganador)}
            <Text style={styles.winnerTeamName}>{resultado.ganador.name}</Text>
            <Text style={styles.winnerScore}>{resultado.puntos} PUNTOS</Text>
          </View>
        )}

        <View style={styles.top5Container}>
          <Text style={styles.top5Title}>🏆 TOP 5 ANOTADORES 🏆</Text>
          {top5.map((jugador, index) => (
            <View key={`${jugador.name}-${index}`} style={styles.top5Item}>
              <Text style={styles.top5Position}>#{index + 1}</Text>
              <View style={styles.top5Info}>
                <Text style={styles.top5Name}>{jugador.name}</Text>
                <Text style={styles.top5Position}>{jugador.position}</Text>
              </View>
              <Text style={styles.top5Points}>{jugador.puntos} PTS</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}