'use strict';
import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Icon, View, Image, Text } from 'react-native';
import * as api from 'ml-api'
import * as constants from 'constants'
import { injectedJS } from './injected.js'

export default class ButtonButtonBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFlagButton: false,
            showUnflagButton: false
        }

        api.getCategories((response) => {
            this.setState({
                categories: response
            });
        });
    }

    showCategories() {
        this.setState({
            showFlagButton: false,
            showUnflagButton: false,
            showCategories: true
        });

        this.props.webView.setState({
            showFullscreenOpacity: true
        })
    }

    render() {
        return (
            <View style={styles.buttonBar}>
                { this.state.showFlagButton ?
                    (
                        <TouchableOpacity style={styles.flagButton}
                            onPress={() => {this.showCategories()}}>
                            <Image source={require('./invisible.png')} style={styles.image}/>
                            <Text style={styles.flagButtonText}>Flag</Text>
                        </TouchableOpacity>
                    ) :
                    ( this.state.showUnflagButton ?
                        (
                            <TouchableOpacity
                                style={styles.flagButton}
                                onPress={this.props.webView.onUnflagButtonPress}>
                                <Image source={require('./visible.png')} style={styles.image}/>
                                <Text style={styles.flagButtonText}>Unflag</Text>
                            </TouchableOpacity>
                        ) :
                        null)
                }
                { this.state.showCategories ?
                    (
                        <ScrollView
                            ref='scrollView'
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            /* Couldn't figure out how to align the content to the
                             right, so I'm just animating it for now. */
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.refs.scrollView.scrollToEnd({animated: true});}}>
                        {
                            this.renderCategoryButtons()
                        }
                        </ScrollView>
                    ):
                    null
                }

            </View>
        );
    }

    /**
    * Returns a button for each category in the state
    */
    renderCategoryButtons() {
        if (!this.state.categories) return null;

        return this.state.categories.map((item, index) => {
            return (
                <TouchableOpacity
                    key={'category' + index}
                    style={styles.flagButton}
                    onPress={() => {this.props.webView.onFlagCategoryButtonPress(item)}}>
                    <Text style={styles.flagButtonText}>{item}</Text>
                </TouchableOpacity>
            );
        });
    }
}

const styles = StyleSheet.create({
    buttonBar: {
        bottom: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        left: 15,
        position: 'absolute',
        right: 15,
    },
    flagButton: {
        alignItems: 'center',
        backgroundColor: constants.COLOR_MAIN,
        borderRadius: 37,
        height: 74,
        justifyContent: 'center',
        margin: 5,
        width: 74,
        zIndex: 3
    },
    flagButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    image: {
        height: 30,
        aspectRatio: 1,
        resizeMode: 'contain'
    }
});
