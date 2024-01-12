import { PageContentDynamicZone } from '@strapi/graphql-types'
import Img from '@components/Image'
import MediaGrid from '@components/MediaGrids'
import TextBlock from '@components/TextBlock'

type ComponentTypeMap = {
  [key: string]: React.ComponentType<any>
}

const COMPONENT_MAP: ComponentTypeMap = {
  ComponentLayoutImageGrid: MediaGrid,
  ComponentMediaImage: Img,
  ComponentLayoutTextBlock: TextBlock,
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
    case 'ComponentMediaImage':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentLayoutTextBlock':
      return <Component key={componentData.id} {...componentData} />
    default:
      return <div>No Component...</div>
  }
}

export default renderComponent
