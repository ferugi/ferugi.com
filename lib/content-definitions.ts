import { config } from '../__generated__/netlify-cms-config/config'

type GetType<TField extends StrictCmsField, TName extends string> = TField extends { name: TName } 
    ? (
          TField extends { widget: "boolean" } ? Boolean 
        : TField extends { widget: "code", output_code_only?: true } ? String 
        : TField extends { widget: "code" } ? Object
        : TField extends { widget: "color" } ? Object
        : TField extends { widget: "date" } ? Date
        : TField extends { widget: "datetime" } ? Date
        : TField extends { widget: "file" } ? String
        : TField extends { widget: "hidden" } ? any
        : TField extends { widget: "image" } ? String
        : TField extends { widget: "list" } ? String[] | any[] // TODO: Improve typing from this
        : TField extends { widget: "map" } ? String
        : TField extends { widget: "markdown" } ? String
        : TField extends { widget: "number" } ? String | number // TODO: Improve typing from this
        //: TField extends { widget: "object", fields: Readonly<StrictCmsField[]> } ? ContentFromFields<TField["fields"]>
        : TField extends { widget: "relation" } ? any // TODO: Improve typing from this
        : TField extends { widget: "select", options: { value: string }[] } ? GetFromOptionsObject<TField>
        : TField extends { widget: "select" } ? GetFromOptionsObject<TField>
        : TField extends { widget: "string" } ? String
        : TField extends { widget: "text" } ? String
        : never
    ) : never

type GetFromOptionsObject<T extends { options: { value: string }[] }> = T["options"][number]["value"]: K extends
type GetFromOptionsString<T extends { options: string[] }> = T["options"][number]

type GetKey<T extends StrictCmsField> = T extends { name: infer TName } ? TName : never
type GetRequiredKey<T extends StrictCmsField> = T extends { name: infer TName, required: true } ? TName : undefined
 
type GetRequiredKeys<T extends Readonly<StrictCmsField[]>> = GetRequiredKey<T[number]>
type GetOptionalKeys<T extends Readonly<StrictCmsField[]>> = Exclude<GetKey<T[number]>, GetRequiredKeys<T>>
 
type ContentFromFields<TFields extends Readonly<StrictCmsField[]>> = 
    { [K in GetOptionalKeys<TFields>]?: GetType<TFields[number], K> } & 
    { [K in GetRequiredKeys<TFields>]: GetType<TFields[number], K> }

type CmsCollectionContent<TCollection extends ExtendedCollectionType> = ContentFromFields<TCollection["fields"]>

const exampleCollection = {
    fields: [
        { name: "body", widget: "boolean" },
        { name: "details", widget: "text", required: true},
    ]
} as const

type ExtendedCollectionType = { readonly fields: Readonly<StrictCmsField[]> }

type StrictCmsField = {
    readonly name: Readonly<string>,
    readonly fields?: Readonly<StrictCmsField>[]
}

type Test = typeof config["collections"][2]["fields"]

const exampleContentType: CmsCollectionContent<typeof config["collections"]["2"]> = {
    type: [{
        label: "Job",
        value: "job"
    }, {
        label: "Project",
        value: "project"
    }, {
        label: "Study",
        value: "study"
    }, {
        label: "University Degree",
        value: "degree"
    }]
    // TODO: fix this..
}

