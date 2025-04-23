/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {FiBatteryCharging, FiCamera, FiEye, FiFeather, FiMic, FiVolume2, FiZap,} from "react-icons/fi";
import {useI18n} from '../hooks/useI18n.js';

const FEATURE_CONTENTS = [
  {
    icon: <FiZap />,
    titleKey: 'feature_high_performance',
    subtitleKey: 'feature_one_press',
  },
  {
    icon: <FiCamera />,
    titleKey: 'feature_16mp_camera',
    subtitleKey: 'feature_capture_moments',
  },
  {
    icon: <FiBatteryCharging />,
    titleKey: 'feature_long_battery',
    subtitleKey: 'feature_enjoy_over',
  },
  {
    icon: <FiFeather />,
    titleKey: 'feature_featherlight_at',
    subtitleKey: 'feature_feels_like',
  },
  {
    icon: <FiVolume2 />,
    titleKey: 'feature_open_ear',
    subtitleKey: 'feature_listen_to',
  },
  {
    icon: <FiEye />,
    titleKey: 'feature_supports_both',
    subtitleKey: 'feature_change_lenses',
  },
  {
    icon: <FiMic />,
    titleKey: 'feature_triple_microphone',
    subtitleKey: 'feature_clear_voice',
  },
];

export default function Feature() {
  const featuresSection1 = FEATURE_CONTENTS.slice(0, 4);
  const featuresSection2 = FEATURE_CONTENTS.slice(4, 7);

  const { t, loading } = useI18n();

  return (
    <SectionWrapper>
      <FeatureRow>
        {featuresSection1.map((item, i) => (
          <FeatureItem key={i}>
            <Icon>{item.icon}</Icon>
            <Title>{t[item.titleKey]}</Title>
            <Subtitle>{t[item.subtitleKey]}</Subtitle>
          </FeatureItem>
        ))}
      </FeatureRow>

      <FeatureRow>
        {featuresSection2.map((item, i) => (
          <FeatureItem key={i}>
            <Icon>{item.icon}</Icon>
            <Title>{t[item.titleKey]}</Title>
            <Subtitle>{t[item.subtitleKey]}</Subtitle>
          </FeatureItem>
        ))}
      </FeatureRow>

    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 0 1.5rem 9rem 1.5rem;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FeatureRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const FeatureItem = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
  background-color: #111;
  border-radius: 0.75rem;
  padding: 1.5rem 2rem;

  @media (max-width: 720px) {
    width: 100%;
  }
`;


const Icon = styled.div`
  font-size: 32px;
  color: white;
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #909294;
  line-height: 1.4;
  margin: 0;
`;
