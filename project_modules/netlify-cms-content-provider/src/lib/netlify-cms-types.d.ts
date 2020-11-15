export type Field = {
    name: string
    label?: string
    required?: boolean
    hint?: string
    pattern?: string
}

export type BooleanField = Field & {
    widget: 'boolean'
    default?: boolean
}

export type CodeField = Field & {
    widget: 'code'
    default_language?: string
    allow_language_selection: boolean
    keys?: { code: string , lang: string }
}

export type ColorField = Field & {
    widget: 'color'
    default?: string
    allowInput?: boolean
    enableAlpha?: boolean
}

export type DateField = Field & {
    widget: 'date' | 'datetime'
    default?: string
    format?: string
    dateFormat?: boolean | string
    timeFormat?: boolean | string
    picker_utc?: boolean
}

export type FileField = Field & {
    widget: 'file'
    default?: string
    allow_multiple?: boolean
    media_library?: {
        config: {
            [key: string]: any
            multiple?: boolean
        }
    }
}

export type HiddenField = Field & {
    widget: 'hidden'
    default?: any
}

export type ImageField = FileField & {
    widget: 'image'
    default?: string
    allow_multiple?: boolean
    media_library?: {
        config: {
            [key: string]: any
            multiple?: boolean
        }
    }
}

export type ListField = 
    BaseListField & { default?: string[] } 
    | BaseListField & { field?: Field } 
    | BaseListField & { fields?: Field[] }

type BaseListField = Field & {
    widget: 'list'
    allow_add?: boolean
    collapsed?: boolean
    summary?: string
    minimize_collapsed?: string
    label_singular?: string
    max?: number
    min?: number
    add_to_top?: boolean
}

export type MapField = Field & {
    widget: 'map'
    decimals?: number
    type?: 'Point' | 'LineString' | 'Polygon'
}

export type Markdown = Field & {
    widget: 'markdown'
    default?: string
    minimal?: boolean
    buttons?: 'bold' | 'italic' | 'code' | 'link' 
        | 'heading-one' | 'heading-two' | 'quote' 
        | 'code-block' | 'bulleted-list' | 'numbered-list'
    editor_components?: string[]
    modes?: "raw" | "rich_text"
}

export type NumberField = Field & {
    widget: 'number'
    default?: string | number
    valueType?: 'int' | 'float' | string
    min?: number
    max?: number
    step?: number
}

export type ObjectField = Field & {
    widget: 'object'
    collapsed?: boolean
    summary: string
    fields: Field[]
}

export type RelationField = Field & {
    widget: 'relation'
    collection: string
    valueField: string
    searchFields: string[]
    file: string
    displayFields?: string[]
    default?: any
    multiple?: boolean
    options_length?: number
}

export type SelectField = Field & {
    widget: 'select'
    default?: string[]
    options?: string[] | { label: string, value: string }[]
    multiple?: boolean
    min: number
    max: number
}

export type StringField = Field & {
    widget: 'string'
    default: string
}

export type TextField = Field & {
    widget: 'text'
    default: string
}

export type Collection = {
    name: string
    identifier_field?: string; 
    label?: string
    label_singular?: string
    description?: string
    files?: string
    folder?: string
    filter?: string
    create?: boolean
    delete?: boolean
    extension?: 'yml' | 'yaml' | 'toml' | 'json' | 'md' | 'markdown' | 'html'
    format?: 'yml' | 'yaml' | 'toml' | 'json' | 'frontmatter' | 'yaml-frontmatter' | 'toml-frontmatter' | 'json-frontmatter'
    frontmatter_delimiter?: string | string[]
    slug?: string
    preview_path?: string
    fields: Field[]; 
    editor?: boolean
    summary?: string
}

export type Config = {
    backend: {
        name: string
        repo?: string
        accept_roles?: string[]
        branch?: string
        api_root?: string
        site_domain?: string
        base_url?: string
        auth_endpoint?: string
    }

    publish_mode?: 'simple' | 'editorial_workflow'

    media_folder: string
    public_folder?: string
    media_library?: {
        name: string
        config?: {
            publicKey?: string
        }
    }

    site_url?: string
    display_url?: string
    logo_url?: string
    show_preview_links?: boolean
    slug?: {
        encoding?: string
        clean_accents?: boolean
        sanitize_replacement?: string
    }

    collections: Collection[]
}
