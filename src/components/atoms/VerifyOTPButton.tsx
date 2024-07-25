import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import Config from '../../shared/Config';
import { CheckSolidCircleIcon, OTPIcon } from '../../shared/Icons';

interface VerifyOTPButtonProps {
    showIcon?: boolean,
    isLoading?: boolean,
    isOTPVerified?: boolean,
    onPress?: () => void

}
export default function VerifyOTPButton(props: VerifyOTPButtonProps) {
    const { showIcon, isLoading, isOTPVerified, onPress } = props;

    if (!showIcon) {
        return null;
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={Config.appPrimaryColor} />

    }
    if (isOTPVerified) {
        return <CheckSolidCircleIcon color={"green"} />;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <OTPIcon height={25} />
        </TouchableOpacity>
    );

}