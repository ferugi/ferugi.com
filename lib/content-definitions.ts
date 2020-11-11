import yaml from 'yaml-template'

export const test = yaml`
    test: 1
`

type Field<TName> = {
    label?: string,
    name: TName,
    widget: string,
    required?: boolean,
    hint?: string,
    pattern?: RegExp
}
 
type BoleanField<TName> = Field<TName> & {
    widget: "code",
    default?: boolean
}

type CodeField<TName> = Field<TName> & {
    widget: "code",
    output_code_only?: boolean
}
 
type TextField<TName> =  Field<TName> & {
    widget: "text"
}

type GetType<TField, TName extends string> = 
    TField extends Field<TName> & { widget: "boolean" } ? Boolean 
    : TField extends CodeField<TName> & { output_code_only?: true } ? String 
    : TField extends CodeField<TName> ? Object
    : TField extends Field<TName> & { widget: "color" } ? String
    : TField extends Field<TName> & { widget: "date" } ? Date
    : TField extends Field<TName> & { widget: "datetime" } ? Date
    : TField extends Field<TName> & { widget: "file" } ? String
    : TField extends Field<TName> & { widget: "hidden" } ? any
    : TField extends Field<TName> & { widget: "image" } ? String
    : TField extends Field<TName> & { widget: "list" } ? String[] | any[] // TODO: Improve typing from this
    : TField extends Field<TName> & { widget: "map" } ? String
    : TField extends Field<TName> & { widget: "markdown" } ? String
    : TField extends Field<TName> & { widget: "number" } ? String | number // TODO: Improve typing from this
    : TField extends Field<TName> & { widget: "object", fields: Readonly<Field<string>[]> } ? CmsCollectionContentFromFields<TField["fields"]>
    : TField extends Field<TName> & { widget: "relation" } ? any // TODO: Improve typing from this
    : TField extends Field<TName> & { widget: "select", multiple?: true } ? String[]
    : TField extends Field<TName> & { widget: "select", multiple?: false | null } ? String
    : TField extends Field<TName> & { widget: "string" } ? String
    : TField extends TextField<TName> ? String
    : never
 
type GetKey<T> = T extends Field<infer TName> ? TName : never
type GetRequiredKey<T> = T extends Field<infer TName> & { required: true } ? TName : undefined
 
type GetAllRequiredKeys<T extends Readonly<Field<string>[]>> = GetRequiredKey<T[number]>
type GetAllKeys<T extends Readonly<Field<string>[]>> = Exclude<GetKey<T[number]>, GetAllRequiredKeys<T>>
 
type CmsCollection = {
    label?: string,
    name?: string,
    identifier_field?: string,
    folder?: string
    create?: boolean,
    fields: Readonly<Field<string>[]> 
}

type CmsCollectionContentFromFields<TFields extends Readonly<Field<string>[]>> = {
    [K in GetAllKeys<TFields>]?: GetType<TFields[number], K>
} & {
    [K in GetAllRequiredKeys<TFields>]: GetType<TFields[number], K>
}

type CmsCollectionContent<TContent extends CmsCollection> = CmsCollectionContentFromFields<TContent["fields"]>

const exampleCollection = {
    label: "test label",
    fields: [
        { name: "body", widget: "markdown" },
        { name: "details", widget: "text", required: true},
    ] as const
}
 
const exampleContentType: CmsCollectionContent<typeof exampleCollection> = {
    body: 23,
    details: new Date()
}
