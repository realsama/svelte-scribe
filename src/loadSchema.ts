import fs from 'fs';
import path from 'path';

const DEFAULT_SCHEMA_PATH = './markdoc';

const normalizePath = (absolute_path: string) => {
    return absolute_path.split(path.sep).join(path.posix.sep);
};

const readModule = async (modulePath: string) => {
    try {
        const resolvedPath = normalizePath(path.posix.resolve(modulePath));
        const moduleFile =
            fs.existsSync(`${resolvedPath}.js`) || fs.existsSync(`${resolvedPath}.ts`)
                ? resolvedPath
                : `${resolvedPath}/index`;
        const { default: moduleSection } = await import(`${moduleFile}.js`);
        return moduleSection;
    } catch (error) {
        return {};
    }
};

export const loadSchema = async (schemaPath: string) => {
    const schemaDirectory = path.posix.resolve(schemaPath);

    const schemaDirectoryExists = fs.existsSync(schemaDirectory);

    if (!schemaDirectoryExists && schemaPath !== DEFAULT_SCHEMA_PATH) {
        throw new Error(
            `Can't find the schema at '${schemaDirectory}' from the passed option 'schema: ${schemaPath}`
        );
    }

    const config = await readModule(`${schemaDirectory}/config`);
    const tags = await readModule(`${schemaDirectory}/tags`);
    const nodes = await readModule(`${schemaDirectory}/nodes`);
    const functions = await readModule(`${schemaDirectory}/functions`);

    return { config, tags, nodes, functions };
};
