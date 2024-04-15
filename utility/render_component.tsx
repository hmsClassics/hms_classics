import { CarContentDynamicZone, PageContentDynamicZone } from '@strapi/types'
import Img from '@components/Image'
import MediaGrid from '@components/MediaGrids'
import TextBlock from '@components/TextBlock'
import ContactForm from '@components/ContactForm'
import Video from '@components/Video'
import ContentBlock from '@components/ContentBlock'
import FeaturedContentBlock from '@components/FeaturedContentBlock'
import ImageGallery from '@components/ImageGallery'

type ComponentTypeMap = {
  [key: string]: React.ComponentType<any>
}

const COMPONENT_MAP: ComponentTypeMap = {
  ComponentLayoutImageGrid: MediaGrid,
  ComponentMediaImage: Img,
  ComponentMediaVideo: Video,
  ComponentLayoutTextBlock: TextBlock,
  ComponentLayoutContentBlock: ContentBlock,
  ComponentLayoutFeaturedContentBlock: FeaturedContentBlock,
  ComponentUtilityContactForm: ContactForm,
  ComponentMediaImageGallery: ImageGallery,
  Error: () => <div>ERROR</div>,
}

const renderComponent = (
  componentData: PageContentDynamicZone | CarContentDynamicZone | null
) => {
  const typeName = componentData?.__typename

  if (!typeName) return null

  const Component = COMPONENT_MAP[typeName]
  if (!Component) {
    console.error(`🚨 No component found for type: ${typeName}`)
    return null // or a default/fallback component
  }

  switch (componentData.__typename) {
    case 'ComponentLayoutImageGrid':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentMediaImage':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentMediaVideo':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentLayoutContentBlock':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentLayoutFeaturedContentBlock':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentLayoutTextBlock':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentUtilityContactForm':
      return <Component key={componentData.id} {...componentData} />
    case 'ComponentMediaImageGallery':
      return <Component key={componentData.id} {...componentData} />
    default:
      return <div>No Component...</div>
  }
}

export default renderComponent
