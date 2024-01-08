import { PageContentDynamicZone } from '../api/graphql-types'
import MediaGrid from '../components/MediaGrids'

type ComponentTypeMap = {
  [key: string]: React.ComponentType<any>
}

const COMPONENT_MAP: ComponentTypeMap = {
  ComponentLayoutImageGrid: MediaGrid,
  Error: () => <div>ERROR</div>,
}

const renderComponent = (componentData: PageContentDynamicZone | null) => {
  const typeName = componentData?.__typename

  if (!typeName) return null

  const Component = COMPONENT_MAP[typeName]
  if (!Component) {
    return null // or a default/fallback component
  }

  switch (componentData.__typename) {
    case 'ComponentLayoutImageGrid':
      return <Component key={componentData.id} {...componentData} />
    default:
      return <div>No Component...</div>
  }
}

export default renderComponent
