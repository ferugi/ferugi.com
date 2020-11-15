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


type CmsField = {
    readonly name: Readonly<string>,
    readonly fields?: Readonly<CmsField>[]
}

export declare type CmsCollectionContent<TCollection extends FolderCollectionType> = ContentFromFields<TCollection["fields"]>

export declare type FolderCollectionType = { 
    readonly name: string
    readonly fields?: Readonly<CmsField[]>
    readonly folder?: string
}

export declare type CollectionsType = Readonly<FolderCollectionType>[]

export declare type ConfigType = { readonly collections: CollectionsType }

export type CollectionNames<TCollections extends CollectionsType> = TCollections[number]["name"]

type CollectionTypes<TCollections extends CollectionsType, TCollection extends FolderCollectionType, TName extends CollectionNames<TCollections>> = 
    TCollection extends { name: TName }
    ? TCollection
    : never

export type GetCollectionType<TCollections extends CollectionsType, TName extends CollectionNames<TCollections>> = CollectionTypes<TCollections, TCollections[number], TName>

export type GetCollectionContentModel<TCollections extends CollectionsType, TCollectionName extends CollectionNames<TCollections>> = CmsCollectionContent<GetCollectionType<TCollections, TCollectionName>>
