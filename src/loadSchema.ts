import fs from 'fs';
import path from 'path';
import Markdoc, { Node } from '@markdoc/markdoc';

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

export const loadSchema = async (
    schemaPath: string,
    supportedExtensions: Array<string>
) => {
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
    const variables = await readModule(`${schemaDirectory}/variables`);
    const partials = processPartials(`${schemaDirectory}/partials`, supportedExtensions);

    return { tags, nodes, functions, variables, partials, ...config };
};

const processPartials = (directory: string, supportedExtensions: Array<string>) => {
    let partials: { [key: string]: Node } = {};

    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const extension = path.extname(file);

        if (supportedExtensions.includes(extension)) {
            const content = fs.readFileSync(path.join(directory, file), 'utf8');

            partials[file] = Markdoc.parse(content);
        }
    });

    return partials;
};
