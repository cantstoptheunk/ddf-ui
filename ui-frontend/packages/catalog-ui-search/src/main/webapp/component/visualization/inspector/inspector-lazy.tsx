import * as React from 'react'
import { hot } from 'react-hot-loader'
import { useLazyResultsFromSelectionInterface } from '../../selection-interface/hooks'
import MRC from '../../../react-component/marionette-region-container'
import { useSelectedResults } from '../../../js/model/LazyQueryResult/hooks'
const InspectorView = require('./inspector.view')
import Extensions from '../../../extension-points'

const postAuditLog = Extensions.postAuditLog
let selectedIds = new Set<string>()

type Props = {
  selectionInterface: any
}

const LazyInspector = ({ selectionInterface }: Props) => {
  const lazyResults = useLazyResultsFromSelectionInterface({
    selectionInterface,
  })
  const selectedResults = useSelectedResults({
    lazyResults,
  })
  const backboneModels = Object.values(selectedResults).map(result => {
    return result.getBackbone()
  })
  React.useEffect(() => {
    selectionInterface.setSelectedResults(backboneModels)
  })
  const conductAudit = () => {
    let newSelectedIds = new Set<string>()
    for (let key in selectedResults) {
      newSelectedIds.add(key)
    }

    let unselectedIds = new Set<string>()
    if (selectedIds.size > 0) {
      selectedIds.forEach((id: string) => {
        if (!newSelectedIds.has(id)) {
          unselectedIds.add(id)
        }
      })
      if (unselectedIds.size > 0) {
        postAuditLog({
          action: 'unselected',
          component: 'resource',
          ids: unselectedIds,
        })
      }
    }

    if (newSelectedIds.size > 0) {
      postAuditLog({
        action: 'selected',
        component: 'resource',
        ids: newSelectedIds,
      })
      selectedIds = newSelectedIds
    }
  }

  return (
    <div>
      {postAuditLog !== undefined && conductAudit()}
      <MRC
        key="inspector"
        view={InspectorView}
        viewOptions={{
          selectionInterface,
        }}
      />
    </div>
  )
}

export default hot(module)(LazyInspector)
