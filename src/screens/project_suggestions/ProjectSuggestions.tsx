import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import BackHeader from '~/components/headers/BackHeader';
import FooterNav from '~/components/FooterProjectS';


// Import the images directly without using constants
const suggest = require('~/assets/icons/image-project_suggest.png');
const sov = require('~/assets/icons/saved-or-votes.png');
const votes = require('~/assets/icons/vote.png');
const message = require('~/assets/icons/Message.png');
const menudots = require('~/assets/icons/MenuDots.png');
const write = require('~/assets/writesuggest.png');

const SuggestionPage = () => {
    
    return (
      <View className="flex-1">
        <ScrollView>
          <BackHeader />
  
          {/* Project Suggestions Section */}
          <View style={styles.projectSuggestionsBorder}>
            <View style={styles.projectSuggestionsTitle}>
              <Image style={styles.suggestImage} source={suggest} />
              <Text style={styles.suggestTitle}>
                Project / Event Suggestions for CICS
              </Text>
              <Image style={styles.suggestImage} source={suggest} />
            </View>
          </View>
        
        <Suggestion/>
        <Suggestion/>
        <Suggestion/>
        <Suggestion/>
        <Suggestion/>
        </ScrollView>
        <View><FooterNav /></View>
        </View>
    );
  };


  const Suggestion = () => {
    return (
      <View> 
          {/* Individual Suggestion */}
          <View style={styles.suggestionBox}>
            <View style={styles.nameSectionVotes}>
              <Text style={styles.nameText}>Jhay Mark Reyes - BSIT 3A</Text>
              <Text style={styles.voteText}>
                24<Image source={sov} />
              </Text>
            </View>
            <Text style={styles.suggestionTitle}>
              IT Ball and kasama po ang mga Alumni
            </Text>
  
            <View style={styles.suggestionActions}>
              <TouchableOpacity style={styles.actionItem}>
                <Image source={votes} />
                <Text style={styles.actionText}>Vote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Image source={message} />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Image source={menudots} />
                <Text style={styles.actionText}>Options</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  };



const styles = StyleSheet.create({
  projectSuggestionsBorder: {
    backgroundColor: 'rgb(118, 52, 57)',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 2,
    marginBottom:'5%',
  },
  projectSuggestionsTitle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    margin: 20,
  },
  suggestImage: {
    width: 50,
    height: 50,
  },
  suggestTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  suggestionBox: {
    marginBottom: '5%',
    width: '80%',
    height: 150,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: 'rgb(217, 217, 217)',
  },
  nameSectionVotes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '4%',
  },
  nameText: {
    color: 'black',
  },
  voteText: {
    color: 'black',
    marginTop: '-2.5%',
  },
  suggestionTitle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 15,
    top: '5%',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  suggestionActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '10%',
  },
  actionItem: {
    alignItems: 'center',
  },
  actionText: {
    color: 'black',
  },
//   writeSuggestion: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     borderWidth: 2,
//     borderRadius: 100,
//     borderColor: 'black',
//     width: 75,
//     height: 75,
//     bottom: 20, // Set the bottom position to adjust the floating height
//     right: 20, // Set the right position to adjust the floating width
//     zIndex: 1, // Make sure it's above other elements
//   },
});

export default SuggestionPage;
