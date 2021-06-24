import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Card, CardHeader, CardBody, Flex } from 'cashcow-ui'
import { useTranslation } from 'contexts/Localization'
import FoldableText from 'components/FoldableText'
import config from './config'

const ImageWrapper = styled.div`
  flex: none;
  order: 2;
  width: 224px;

  ${({ theme }) => theme.mediaQueries.md} {
    order: 1;
  }
`

const DetailsWrapper = styled.div`
  order: 1;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    order: 2;
    margin-bottom: 0;
    margin-left: 40px;
  }
`

const IfoQuestions = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems={['center', null, null, 'start']} flexDirection={['column', null, null, 'row']}>
      <ImageWrapper>
        <img src="/images/ifo-bunny.png" alt="ifo bunny" width="224px" height="208px" />
      </ImageWrapper>
      <DetailsWrapper>
        <Card>
          <CardHeader>
            <Heading size="lg" color="secondary">
              {t('Details')}
            </Heading>
          </CardHeader>
          {/* <CardBody>
            {config.map(({ title, description }) => (
              <FoldableText
                key={title.fallback}
                id={title.fallback}
                mb="24px"
                title={t(title.id, title.fallback)}
              >
                {description.map(({ id, fallback }) => {
                  return (
                    <Text key={fallback} color="textSubtle" as="p">
                      {t(id, fallback)}
                    </Text>
                  )
                })}
              </FoldableText>
            ))}
          </CardBody> */}
          <CardBody>
            {config.map(({ title, description }, i, { length }) => (
              <FoldableText key={title} id={title} mb={i + 1 === length ? '' : '24px'} title={t(title)}>
                {description.map((desc) => {
                  return (
                    <Text key={desc} color="textSubtle" as="p">
                      {t(desc)}
                    </Text>
                  )
                })}
              </FoldableText>
            ))}
          </CardBody>
        </Card>
      </DetailsWrapper>
    </Flex>
  )
}

export default IfoQuestions
