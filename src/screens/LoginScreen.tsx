import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import ErrorMsg from '../components/atoms/ErrorMsg';
import Heading from '../components/atoms/Heading';
import Input from '../components/atoms/Input'
import MyButton from '../components/atoms/MyButton';
import AuthContext from '../context/AuthContext';
import { AuthenticateUser,  } from '../services/AccountService';


import Config from '../shared/Config';
import { PasswordIcon, UserIcon } from '../shared/Icons';
import * as Updates from 'expo-updates';
import MyText from '../components/atoms/MyText';
import { GetAllMandirs } from '../services/RegistrationService';
import { DropDownModel } from '../components/atoms/DropDownModalSelector';
import FormGroupDDL from '../components/molecules/FormGroupDDL';
import { User } from '../models/User';
import EventsScreen from './Events/EventsScreen';
import { BaseProps } from './Dashboard/DashboardScreen';
import EventsScreenPublic from './Events/EventsScreenPublic';
import { setUserDetail } from '../services/DataStorageService';

var appJson = require("../../app.json");

export default function LoginScreen(props: BaseProps) {
    const { route,navigation } = props;
    const { onAuthenticationSuccess } = React.useContext(AuthContext);

    const [username, setUsername] = React.useState<string>('');
    const [pwd, setPwd] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [listMandirs, setListMandirs] = React.useState<DropDownModel[]>([]);
    const [mandirVal, setMandirVal] = React.useState<string>('');
    const [mandirLabel, setMandirLabel] = React.useState('Select Mandir');

    const onLoginClick = async () => {

        if (!username || !pwd) {
            // alert('Enter Username and Password')
            setError('Enter Username and Password');
            return;
        }
        try {


            setError('');
            console.log({ username, pwd }, "param");
            setIsLoading(true);
            const res = await AuthenticateUser(username, pwd);
            console.log(res, "res -login");
            if (res?.errorMsg == 'Invalid Username/Password') {
                // alert('Wrong username password')
                setError('Wrong username password');

            } else if (res?.user) {
                // const user = res.data?.result?.userDetail;
                // if (user.role == 'gateUser' || user.role?.toLowerCase() == 'user' || user.role?.toLowerCase() == 'admin' || user.role == 'broker') {
                setUserDetail(res?.user);

                // setTokens(res.data.result.accessToken, res.data.result.refreshToken);
                // await getAndSaveSettings();
                onAuthenticationSuccess && onAuthenticationSuccess(true);
                // } else {
                //     // setUserDetail(res?.data?.user);
                //     // onAuthenticationSuccess && onAuthenticationSuccess(true, res.data.user.role);
                //     alert('Currently App is working for Site and LMS User Only');
                // }

                setError('');

            } else {
                alert(res?.errorMsg)
            }
        } catch (e) {
            alert('Error : ' + e);
            setIsLoading(false);
        }

        setIsLoading(false);
    }

 
   
    
    
   
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#fff',
            // flexDirection: 'column',
            // justifyContent: 'space-between',
            // paddingTop: StatusBar.currentHeight,
        }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={[styles.container]} >
                        {/* <Text>Login Screen - {username}</Text> */}
                        <Image
                            style={[styles.image, { width: '90%', height: 250, alignSelf: 'center', borderRadius: 10 }]}
                            source={require("../../assets/icons/rammandir1.png")}
                        />
                        {/* <TempleIcon size={100} /> */}
                        <View style={{ marginBottom: 0 }}>

                            <MyText text='Mandir Management System' bold color='#575757' fontSize={25} />
                        </View>
                        <ErrorMsg error={error} />
                        <Input placeholder='Username' value={username} onChangeText={val => setUsername(val)}
                            style={styles.input}
                            iconLeft={<UserIcon size={22} color="black" />}
                        />
                        <Input placeholder='Password' value={pwd} onChangeText={val => setPwd(val)}
                            style={styles.input}
                            iconLeft={<PasswordIcon size={22} color="black" />}
                            isPasswordField />

                        <MyButton text='Login' type='solid' onPress={onLoginClick}
                            containerStyle={styles.loginButtonContainer}
                            loading={isLoading}
                            paddingVertical={15}
                        />
                       
                    </View>
                    {/* <EventsScreenPublic navigation={navigation} route={route}/> */}
                    {/* <View style={styles.bottomContainer}>
                        <Text
                            style={{ padding: 3 }}
                        />
                        <Text style={{ padding: 5, fontSize: 12, paddingBottom: 0, textAlign: "center", color: 'grey' }}>
                            {"Version - " + appJson.expo.version}
                        </Text>
                        <Text style={{ padding: 5, fontSize: 12, textAlign: "center", color: 'grey' }}>
                            {"Last Updated Date - "}
                            <Text style={{ fontWeight: 'bold' }}>
                                {Updates.createdAt?.toDateString()} */}
                                {/* {
                                    JSON.stringify(Updates)
                                } */}
                            {/* </Text>
                        </Text>

                        <Text style={{ textAlign: "center", marginBottom: 5, color: 'grey' }}>
                            {" "}
                            ©Copyrights mail@alicesoft.co.in
                        </Text>
                    </View> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexGrow: 1,
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        padding: 16,
        paddingTop: 80,
        alignItems: "center",
        backgroundColor: "#fff",

    },
    image: {
        marginBottom: 20,
    },

    input: {
        marginVertical: 8,
    },
    loginButtonContainer: {
        marginTop: 10
    },
    bottomContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

