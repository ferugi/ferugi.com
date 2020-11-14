import fs from 'fs'
import { watch } from 'chokidar'
import path from 'path'
import yaml from 'js-yaml'
import { Project, QuoteKind, VariableDeclarationKind } from 'ts-morph'

export function watchNetlifyCmsConfig(configPath: string) {
    // watch the config file for changes
    const watcher = watch(configPath)
    watcher.on('change', onChange)
}

const outputDir = path.join(process.cwd(), './__generated__/netlify-cms-config') 

function onChange(configPath: string, stats?: fs.Stats) {
    const fileExtension = path.extname(configPath)

    if (fileExtension !== '.yml') {
        throw new Error(`File with incorrect extension to watcher. Expected "yml", received "${fileExtension}"`)
    }

    const configFile = fs.readFileSync(configPath, { encoding: 'utf-8' })

    // parse YML
    const parsedConfig = yaml.safeLoad(configFile) as { [key: string]: any }
    
    const project = new Project({
        useInMemoryFileSystem: false,
        manipulationSettings: {
            quoteKind: QuoteKind.Single,
        },
    })

    // generate config.ts
    const configTsFilePath = path.join(outputDir, 'config.ts')
    const configTsFile = project.createSourceFile(configTsFilePath, "", { overwrite: true })

    configTsFile.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const, // defaults to "let"
        declarations: [{
            name: "config",
            initializer: JSON.stringify(parsedConfig, null, "\t")//Writers.assertion(JSON.stringify(parsedConfig, null, "\t"), "const")
        }],
    }).setIsExported(true)

    configTsFile.saveSync()
}

/*
    TODO: 
    read config.yaml
        generate config.yaml.ts
        generate content model dts

        generate content.ts
            lazy load singe files or collections
*/