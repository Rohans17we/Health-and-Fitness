import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoWifiOutline, IoBatteryFullOutline, IoTimeOutline, IoNotificationsOutline } from 'react-icons/io5';
import { FaSignal } from 'react-icons/fa';
import HeroIphoneWidget from '../LandingPage/Hero/HeroWidget/HeroIphoneWidget/HeroIphoneWidget';

const iPhone = ({ 
    userName = null, 
    primaryWidget = <HeroIphoneWidget />,
    secondaryWidget = null,
    bottomWidget = null
  }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    
    // Set interval to update time every minute
    const intervalId = setInterval(updateTime, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PhoneContainer>
      <PhoneFrame>
        {/* Screen with bezels */}
        <Screen>
          <StatusBar>
            <Time>{currentTime}</Time>
            <DynamicIsland>
              <Camera />
              <Speaker />
            </DynamicIsland>
            <StatusIcons>
              <FaSignal size="1rem" />
              <IoWifiOutline size="1.125rem" />
              <IoBatteryFullOutline size="1.25rem" />
            </StatusIcons>
          </StatusBar>
          
          <Content>
            {userName && (
              <GreetingBar>
                <Greeting>
                  <GreetingText>Hello,</GreetingText>
                  <UserName>{userName}</UserName>
                </Greeting>
                <NotificationIcon>
                  <IoNotificationsOutline size={24} />
                </NotificationIcon>
              </GreetingBar>
            )}
            
            <WidgetSection>
              {primaryWidget}
            </WidgetSection>
            
            {secondaryWidget && (
              <WidgetSection>
                {secondaryWidget}
              </WidgetSection>
            )}
            
            {bottomWidget && (
              <BottomWidgetSection>
                {bottomWidget}
              </BottomWidgetSection>
            )}
          </Content>
        </Screen>
      </PhoneFrame>
    </PhoneContainer>
  );
};

// Styled components
const PhoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: transparent;

  .dark-mode & {
    background-color: transparent;
  }
`;

const PhoneFrame = styled.div`
  width: 375px;
  height: 750px;
  background-color: #111;
  border-radius: 55px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 12px;
  border: 1px solid #444;

  .dark-mode & {
    background-color: #000;
    border-color: #333;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 600px;
    border-radius: 55px;
    padding: 12px;
    border: 1px solid #444;
  }
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 45px;
  overflow: hidden;
  position: relative;

  .dark-mode & {
    background-color: #121212;
  }
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 5px 15px;
  height: 44px;
  position: relative;
  background-color: white;

  .dark-mode & {
    background-color: #121212;
  }
`;

const Time = styled.div`
  font-weight: bold;
  font-size: 14px;
  z-index: 2;
  color: black;

  .dark-mode & {
    color: white;
  }
`;

const DynamicIsland = styled.div`
  width: 9vw;
  height: 34px;
  background-color: black;
  border-radius: 20px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  z-index: 1;

  @media (max-width: 768px) {
    width: 90px;
  }
`;

const Camera = styled.div`
  width: 12px;
  height: 12px;
  background-color: #222;
  border-radius: 50%;
  border: 2px solid #444;

  .dark-mode & {
    background-color: #1a1a1a;
    border-color: #333;
  }
`;

const Speaker = styled.div`
  width: 60px;
  height: 6px;
  background-color: #333;
  border-radius: 3px;

  .dark-mode & {
    background-color: #222;
  }
`;

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
  color: black;

  .dark-mode & {
    color: white;
  }
`;

const Content = styled.div`
  padding: 10px;
  height: calc(100% - 44px);
  overflow: Hidden;
  background-color: #fff;

  .dark-mode & {
    background-color: #121212;
  }
`;

const GreetingBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  margin-bottom: 15px;

  .dark-mode & {
    border-bottom-color: #333;
  }
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
`;

const GreetingText = styled.div`
  font-size: 16px;
  color: #666;

  .dark-mode & {
    color: #aaa;
  }
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;

  .dark-mode & {
    color: #fff;
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  position: relative;
  transition: transform 0.2s ease, color 0.2s ease;
  
  .dark-mode & {
    color: #e0e0e0;
  }

  &:hover {
    transform: scale(1.1);
    color: #007aff;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
  }
`;

// New styled components for widget sections
const WidgetSection = styled.div`
  margin-bottom: 16px;

  .dark-mode & {
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 10px;
  }
`;

const BottomWidgetSection = styled.div`
  margin-top: auto;
  padding-top: 16px;

  .dark-mode & {
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 10px;
  }
`;

export default iPhone;