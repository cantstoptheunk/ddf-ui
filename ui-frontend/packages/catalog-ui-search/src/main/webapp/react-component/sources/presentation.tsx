/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import * as React from 'react'
import styled from 'styled-components'
import SourceItem from '../source-item'
import SourcesSummary from '../sources-summary'
import { hot } from 'react-hot-loader'

const Root = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const SourcesCenter = styled.div`
  margin: auto;
  max-width: ${props => {
    return props.theme.screenBelow(props.theme.mediumScreenSize)
      ? '100%'
      : '1200px'
  }};
  padding: 0px
    ${props =>
      props.theme.screenBelow(props.theme.mediumScreenSize) ? '20px' : '100px'};
  overflow: auto;
  height: 100%;
`

type Source = {
  id: string
  sourceActions: any[]
  available: boolean
}

type Props = {
  sources: Source[]
  amountDown: number
  refreshSources: () => void
}

export default hot(module)(({ sources, amountDown, refreshSources }: Props) => {
  return (
    <Root>
      <SourcesCenter>
        <SourcesSummary amountDown={amountDown} />
        {sources.map(source => {
          return (
            <SourceItem
              key={source.id}
              sourceActions={source.sourceActions}
              refreshSources={refreshSources}
              id={source.id}
              available={source.available}
            />
          )
        })}
      </SourcesCenter>
    </Root>
  )
})
