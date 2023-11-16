import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, icons, FONTS} from '../constants';

const LineDiveder = () => {
  return (
    <View style={{width: 1, paddingVertical: 5}}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}></View>
    </View>
  );
};

const BookDetail = ({route, navigation}) => {
  const [book, setBook] = useState(null);
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

  const Indicator = new Animated.Value(0);

  useEffect(() => {
    let {book} = route.params;
    setBook(book);
  }, [book]);

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={book.bookCover}
          resizeMode="cover"
          style={{position: 'absolute', right: 0, bottom: 0, top: 0, left: 0}}
        />
        {/**Color Overlay */}
        <View
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: book.backgroundColor,
          }}></View>
        {/**Navigation Header */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{marginLeft: SIZES.base}}
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: book.navTintColor}}
            />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{...FONTS.h3, color: book.navTintColor}}>
              Book Detail
            </Text>
          </View>
          <TouchableOpacity
            style={{marginRight: SIZES.base}}
            onPress={() => console.log('Click More')}>
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: book.navTintColor,
                alignSelf: 'flex-end',
              }}
            />
          </TouchableOpacity>
        </View>
        {/**book cover */}
        <View
          style={{flex: 5, paddingTop: SIZES.padding2, alignItems: 'center'}}>
          <Image
            source={book.bookCover}
            resizeMode="contain"
            style={{flex: 1, width: 150, height: 'auto'}}
          />
        </View>
        {/**book name and author */}
        <View
          style={{flex: 1.8, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.h2, color: book.navTintColor}}>
            {book.bookName}
          </Text>
          <Text style={{...FONTS.h2, color: book.navTintColor}}>
            {book.author}
          </Text>
        </View>
        {/**book info */}
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            margin: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {/**Rating */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.rating}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Rating</Text>
          </View>
          <LineDiveder />
          {/**pages */}
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.radius,
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.pageNo}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>
              Number Of Page
            </Text>
          </View>
          <LineDiveder />
          {/**language */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.language}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white}}>Language</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    const IndicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > IndicatorSize
        ? scrollViewVisibleHeight - IndicatorSize
        : 1;
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: SIZES.padding}}>
        {/**Custom Scrollbar */}
        <View
          style={{
            width: 4,
            height: '100%',
            backgroundColor: COLORS.gray1,
          }}>
          <Animated.View
            style={{
              width: 4,
              height: IndicatorSize,
              backgroundColor: COLORS.lightGray4,
              transform: [
                {
                  translateY: Animated.multiply(
                    Indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight,
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          />
        </View>
        <ScrollView
          contentContainerStyle={{paddingLeft: SIZES.padding2}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: {x, y, width, height},
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: Indicator}}}],
            {useNativeDriver: false},
          )}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.white,
              marginBottom: SIZES.padding,
            }}>
            Description
          </Text>
          <Text style={{...FONTS.body2, color: COLORS.lightGray}}>
            {book.description}
          </Text>
        </ScrollView>
      </View>
    );
  }
  function renderBottomButton() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/**bookmak */}

        <TouchableOpacity
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('bookmark')}>
          <Image
            source={icons.bookmark_icon}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.lightGray2,
            }}
          />
        </TouchableOpacity>
        {/**start reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('START READING')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/**book cover section */}
        <View style={{flex: 4}}>{renderBookInfoSection()}</View>
        {/**describtion */}
        <View style={{flex: 2}}>{renderBookDescription()}</View>
        {/**Buttons */}
        <View style={{height: 70, marginBottom: 30}}>
          {renderBottomButton()}
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;

const styles = StyleSheet.create({});
