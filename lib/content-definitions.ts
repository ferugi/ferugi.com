import { config } from '../__generated__/netlify-cms-config/config'

type GetType<TField extends CmsField, TName extends string> = TField extends { name: TName } 
    ? (
          TField extends { widget: "boolean" } ? Boolean 
        : TField extends { widget: "code", output_code_only?: true } ? string 
        : TField extends { widget: "code" } ? Object
        : TField extends { widget: "color" } ? Object
        : TField extends { widget: "date" } ? Date
        : TField extends { widget: "datetime" } ? Date
        : TField extends { widget: "file" } ? string
        : TField extends { widget: "hidden" } ? any
        : TField extends { widget: "image" } ? string
        : TField extends { widget: "list" } ? string[] | any[] // TODO: Improve typing from this
        : TField extends { widget: "map" } ? string
        : TField extends { widget: "markdown" } ? string
        : TField extends { widget: "number" } ? string | number // TODO: Improve typing from this
        : TField extends { widget: "object", fields: Readonly<CmsField[]> } ? ContentFromFields<TField["fields"]>
        : TField extends { widget: "relation" } ? any // TODO: Improve typing from this
        : TField extends { widget: "select" } ? GetFromOptions<TField>
        : TField extends { widget: "string" } ? string
        : TField extends { widget: "text" } ? string
        : never
    ) : never

type GetFromOptions<T> =  
      T extends { options: readonly string[] } ? T["options"][number]
    : T extends { options: readonly { value: string }[] } ? T["options"][number]["value"]
    : never

type GetKey<T extends CmsField> = T extends { name: infer TName } ? TName : undefined
type GetRequiredKey<T extends CmsField> = T extends { name: infer TName, required: true } ? TName : undefined
 
type GetRequiredKeys<T extends Readonly<CmsField[]>> = GetRequiredKey<T[number]>
type GetOptionalKeys<T extends Readonly<CmsField[]>> = Exclude<GetKey<T[number]>, GetRequiredKeys<T>>
 
type ContentFromFields<TFields extends Readonly<CmsField[]>> = 
    { [K in GetOptionalKeys<TFields>]?: GetType<TFields[number], K> } & 
    { [K in GetRequiredKeys<TFields>]: GetType<TFields[number], K> }

type CmsCollectionContent<TCollection extends CollectionType> = ContentFromFields<TCollection["fields"]>

type CollectionType = { readonly fields: Readonly<CmsField[]> }

type CmsField = {
    readonly name: Readonly<string>,
    readonly fields?: Readonly<CmsField>[]
}

const exampleContentType: CmsCollectionContent<typeof config["collections"]["2"]> = {
    type: "job"
}
