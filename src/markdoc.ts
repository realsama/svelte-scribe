import Markdoc from '@markdoc/markdoc';
import { loadSchema } from './loadSchema';
import { addFrontmatter, getComponentMap, getComponents } from './utils';
import path from 'path';

const __dirname = path.resolve();

interface Options {
    extensions?: string[];
    layout?: string;
    schema?: string;
    components?: string;
}

const DEFAULT_SCHEMA_PATH = './markdoc';
// const DEFAULT_COMPONENTS_PATH = './src/markdoc/components';
const DEFAULT_COMPONENTS_PATH = path.join(__dirname, 'src', 'markdoc', 'components');

const markdoc = (options: Options = {}) => {
    const layoutPath = options.layout;
    const schemaPath = options.schema || DEFAULT_SCHEMA_PATH;
    const supportedExtensions = options.extensions || ['.md'];
    const componentsPath = options.components || DEFAULT_COMPONENTS_PATH;

    const getImportStatements = (components: [string, string][]) => {
        let importStatements = '';
        for (const [name, path] of components) {
            importStatements += `import ${name} from '${path}';\n`;
        }
        return importStatements;
    };

    const markup = async ({ content = '', filename = '' }) => {
        if (!supportedExtensions.some((extension) => filename.endsWith(extension))) {
            return null;
        }

        const schema = await loadSchema(schemaPath);

        const ast = Markdoc.parse(content);
        const astWithFrontmatter = addFrontmatter(ast, schema);
        const transformedAst = Markdoc.transform(ast, astWithFrontmatter);

        const components = getComponents(componentsPath);
        const importStatements = getImportStatements(components);
        const componentMap = getComponentMap(components);

        const children = transformedAst.children;

        const code = `
			<script>
				${importStatements}
				import Layout from "svelte-scribe/RenderLayout.svelte";
				
				const components = new Map([${componentMap}]);

				const children = ${JSON.stringify(children)};
			</script>

			<Layout {children} {components} />
    		`;

        return {
            code,
            data: {},
        };
    };

    return { markup };
};

export default markdoc;
