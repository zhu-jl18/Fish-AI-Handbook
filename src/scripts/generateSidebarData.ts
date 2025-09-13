import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'

export interface SidebarLink {
  label: string
  href: string
}

export interface SidebarGroup {
  label: string
  href: string
  items: (SidebarLink | SidebarGroup)[] // 允许嵌套分组
}

export type SidebarSection = (SidebarLink | SidebarGroup)[]

export async function generateSidebarData() {
  const posts = await getCollection('docs')
  const postMap = new Map<string, CollectionEntry<'docs'>>()

  // 创建一个 slug 到 post 的映射
  for (const post of posts) {
    postMap.set(post.slug, post)
  }

  // 创建一个内容树
  const contentTree: Record<string, ContentNode> = {}

  // 第一步：初始化所有节点
  for (const post of posts) {
    const pathParts = post.slug.split('/')
    let currentLevel = contentTree

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i]
      const fullPath = pathParts.slice(0, i + 1).join('/')

      if (!currentLevel[part]) {
        currentLevel[part] = {
          slug: fullPath,
          title: '',
          children: {}
        }
      }

      if (i === pathParts.length - 1) {
        // 这是叶子节点，更新其标题
        currentLevel[part].title = post.data.title || post.slug
      }

      currentLevel = currentLevel[part].children!
    }
  }

  // 第二步：构建侧边栏数据
  const sidebarData: Record<string, SidebarSection> = {}

  for (const [topLevelKey, topLevelNode] of Object.entries(contentTree)) {
    sidebarData[topLevelKey] = buildSidebarSection(topLevelNode, postMap)
  }

  return sidebarData
}

interface ContentNode {
  slug: string
  title: string
  children?: Record<string, ContentNode>
}

function buildSidebarSection(node: ContentNode, postMap: Map<string, CollectionEntry<'docs'>>): SidebarSection {
  const section: SidebarSection = []

  // 如果这个节点有子节点，它应该是一个分组
  if (node.children && Object.keys(node.children).length > 0) {
    for (const [childKey, childNode] of Object.entries(node.children)) {
      // 递归构建子项
      const childSection = buildSidebarSection(childNode, postMap)

      // 如果子项只有一个且是链接，则直接将其作为链接添加
      if (childSection.length === 1 && 'href' in childSection[0] && !('items' in childSection[0])) {
        section.push(childSection[0])
      } else {
        // 否则，创建一个分组
        section.push({
          label: childNode.title || childKey,
          href: `/${childNode.slug}`,
          items: childSection
        })
      }
    }
  } else {
    // 如果没有子节点，则添加一个链接
    section.push({
      label: node.title || node.slug,
      href: `/${node.slug}`
    })
  }

  return section
}