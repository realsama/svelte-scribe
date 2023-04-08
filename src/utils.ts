import { Node } from '@markdoc/markdoc';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export const getComponentMap = (components: Map<String, String>) => {
    let componentMap = '';
    for (const [name] of components) {
        componentMap += `[${JSON.stringify(name)}, ${name}],\n`;
    }
    return componentMap;
};

export const addFrontmatter = (ast: Node, config) => {
    const frontmatter = ast.attributes.frontmatter
        ? yaml.load(ast.attributes.frontmatter)
        : {};
    const markdoc = Object.assign(config?.variables?.markdoc || {}, { frontmatter });
    const variables = Object.assign(config?.variables || {}, { markdoc });
    return Object.assign(config, { variables });
};

export const getComponents = (componentsDir: string) => {
    let componentsMap: Map<string, string> = new Map();

    const getComponentName = (fileName: string, isNested: boolean, filePath: string) => {
        if (isNested) {
            const [folderName] = filePath.split('/').slice(-2, -1);
            if (folderName === 'index') {
                return 'Index';
            } else if (fileName === `${folderName}.svelte`) {
                return `${folderName[0].toUpperCase()}${folderName.slice(1)}`;
            } else {
                return null;
            }
        }
        const componentName = fileName.split('.svelte')[0];
        return `${componentName[0].toUpperCase()}${componentName.slice(1)}`;
    };

    const traverseDir = (dir: string, isNested = false) => {
        if (!fs.existsSync(dir)) return;

        fs.readdirSync(dir).forEach((file: string) => {
            const filePath = path.join(dir, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                traverseDir(filePath, true);
            } else if (file.endsWith('.svelte')) {
                const componentName = getComponentName(file, isNested, filePath);
                if (componentName) {
                    componentsMap.set(componentName, filePath);
                }
            }
        });
    };

    traverseDir(componentsDir);
    return componentsMap;
};
