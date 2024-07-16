import React, {useEffect} from 'react'
// import remoteConfig from '@react-native-firebase/remote-config';
import {
  // Alert,
  // Linking,
  Permission,
  PermissionsAndroid,
  Platform,
} from 'react-native'
// import DeviceInfo from 'react-native-device-info';

type PropsType = {
  children: React.ReactNode
}

export const VersionCheckContainer: React.FC<PropsType> = ({children}) => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const is_permitted = await PermissionsAndroid.check(
          'android.permission.POST_NOTIFICATIONS' as Permission,
        )
        if (!is_permitted) {
          await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS' as Permission)
        }
      } catch (err) {}
    }

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      requestPermission()
    }

    // TODO: fix install react-native-device-info ???
    // const showUpdateAlert = () => {
    //   Alert.alert(
    //     'update information',
    //     'A new version is available. Please update to the latest version.',
    //     [
    //       {
    //         text: 'Update',
    //         onPress: () => {
    //           openStoreUrl();
    //         },
    //       },
    //     ],
    //   );
    // };

    // function openStoreUrl() {
    //   if (Platform.OS === 'ios') {
    //     const appId = 1563328707; // TODO あとでstagingとproductionと分ける
    //     const itunesURLScheme = `itms-apps://itunes.apple.com/jp/app/id${appId}?mt=8`;
    //     const itunesURL = `https://itunes.apple.com/jp/app/id${appId}?mt=8`;
    //     Linking.canOpenURL(itunesURLScheme).then(supported => {
    //       if (supported) {
    //         Linking.openURL(itunesURLScheme);
    //       } else {
    //         Linking.openURL(itunesURL);
    //       }
    //     });
    //   } else {
    //     const appId = 'jp.co.nestem.estemclub.asset'; // PlayストアのURLから確認できるid=?の部分
    //     const playStoreURLScheme = `market://details?id=${appId}`;
    //     const playStoreURL = `https://play.google.com/store/apps/details?id=${appId}`;

    //     Linking.canOpenURL(playStoreURLScheme).then(supported => {
    //       if (supported) {
    //         void Linking.openURL(playStoreURLScheme);
    //       } else {
    //         void Linking.openURL(playStoreURL);
    //       }
    //     });
    //   }
    // }

    // remoteConfig()
    //   .setDefaults({
    //     minimumVersionCode: 0,
    //   })
    //   .then(() => remoteConfig().fetchAndActivate())
    //   .then(() => {
    //     const minimumVersionCode = remoteConfig()
    //       .getValue('minimumVersionCode')
    //       .asNumber();
    //     console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe');
    //     console.log('minimumVersionCode', minimumVersionCode);
    //     console.log('getBuildNumber', Number(DeviceInfo.getBuildNumber()));
    //     if (minimumVersionCode > Number(DeviceInfo.getBuildNumber())) {
    //       showUpdateAlert();
    //     }
    //   });
  }, [])

  return <>{children}</>
}
