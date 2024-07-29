import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CardProject = ({ url, title, description, urlId, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: url }} style={styles.projectImage} />
      <Text style={styles.projectTitle}>{title}</Text>
      <Text style={styles.projectDescription}>{description}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => onPress({ title, url, urlId, description })}>
        <Text style={styles.buttonText}>Get Project</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CardProject;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
  },
  projectImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
    resizeMode: "cover",
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
