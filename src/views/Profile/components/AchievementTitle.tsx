import React from 'react'
import { Text, TextProps } from 'cashcow-ui'
import useI18n from 'hooks/useI18n'
import { TranslatableText as AchievementTitleType } from 'state/types'
import { useTranslation } from 'contexts/Localization'

interface AchievementTitleProps extends TextProps {
  title: AchievementTitleType
}

const AchievementTitle: React.FC<AchievementTitleProps> = ({ title, ...props }) => {
  const { t } = useTranslation()

  if (typeof title === 'string') {
    return (
      <Text bold {...props}>
        {title}
      </Text>
    )
  }

  // const { id, fallback, data = {} } = title
  const { key, data = {} } = title
  return (
    <Text bold {...props}>
      {/* {t(id, fallback, data)} */}
      {t(key, data)}
    </Text>
  )
}

export default AchievementTitle
