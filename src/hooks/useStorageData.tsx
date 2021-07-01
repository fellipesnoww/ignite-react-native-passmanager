import React, { createContext, ReactNode, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageDataContext {
    getItem(): Promise<LoginListDataProps>;
    setItem(newPasswordData : LoginDataProps): Promise<void>;
}

interface StorageProviderProps{
    children: ReactNode
}

interface LoginDataProps {
    id: string;
    title: string;
    email: string;
    password: string;
  };
  
  type LoginListDataProps = LoginDataProps[];

const StorageDataContext = createContext({} as IStorageDataContext);


function StorageProvider({ children }: StorageProviderProps){

    const loginKey = '@passmanager:logins';

    async function getItem(): Promise<LoginListDataProps>{
        const response = await AsyncStorage.getItem(loginKey);
        const loginsTransformed: LoginListDataProps = response ? JSON.parse(response) as LoginListDataProps : [];
        return loginsTransformed;
    };

    async function setItem(newPasswordData : LoginDataProps): Promise<void>{

        const storagedData = await getItem();

        storagedData.push(newPasswordData);
        
        await AsyncStorage.setItem(loginKey, JSON.stringify(storagedData));
    };

    return (
        <StorageDataContext.Provider value={{
            getItem,
            setItem
        }}>
            { children }
        </StorageDataContext.Provider>
    )
}

function useStorageData()
{
    const context = useContext(StorageDataContext);

    return context;
}
export { StorageProvider, useStorageData}