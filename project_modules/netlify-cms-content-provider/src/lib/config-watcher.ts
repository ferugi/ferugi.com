import fs from 'fs'
import { watch } from 'chokidar'
import path from 'path'
import yaml from 'js-yaml'
import { Project, QuoteKind, ScriptKind, SourceFile, VariableDeclarationKind, Writers } from 'ts-morph'

export function watchNetlifyCmsConfig(configPath: string) {
    // watch the config file for changes
    const watcher = watch(configPath)
    watcher.on('change', onChange)
}

const outputDir = path.join(__dirname, '../__generated__') 

function onChange(configPath: string, stats?: fs.Stats) {
    const fileExtension = path.extname(configPath)

    if (fileExtension !== '.yml') {
        throw new Error(`File with incorrect extension to watcher. Expected "yml", received "${fileExtension}"`)
    }

    // Read and Parse YML
    const configFile = fs.readFileSync(configPath, { encoding: 'utf-8' })
    const parsedConfig = yaml.safeLoad(configFile) as { [key: string]: any }
    
    // Separate collections from config
    const parsedCollections = parsedConfig.collections
    delete parsedConfig.collections

    // Generate Typescript File
    const project = new Project({
        compilerOptions: {
            declaration: true,
            outDir: outputDir,
            sourceMap: true
        }
    })

    // TODO: Now output the right files...
    const configTsFile = project.createSourceFile('generated-config.ts', "", { overwrite: true })

    configTsFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const, // defaults to "let"
        declarations: [{
            name: "config",
            initializer: JSON.stringify(parsedConfig, null, "\t")//
        }, {
            name: "collections",
            initializer: Writers.assertion(JSON.stringify(parsedCollections, null, "\t"), "const")
        }],
    }).setIsExported(true)

    const result = project.emitSync()
}
