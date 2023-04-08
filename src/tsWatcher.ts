import { ChildProcess, spawn } from 'child_process';
import path from 'path';

const __dirname = path.resolve();

export function tscPlugin(dir: string) {
    let tsc: ChildProcess | undefined;

    return {
        name: 'tsc',
        apply: 'serve',
        buildStart() {
            tsc = spawnTsc(`npx tsc ${dir}/*.ts --module esnext`, '--watch');

            tsc.once('exit', (tscExitCode: Number) => {
                if (tscExitCode === null || tscExitCode === 0) return;
                process.exit(tscExitCode);
            });
        },
        buildEnd() {
            if (!tsc) return;
            tsc.kill();
        },
    };
}

function spawnTsc(command: string, args = ''): ChildProcess {
    return spawn(`${command} --pretty ${args}`, [], {
        stdio: 'inherit',
        shell: true,
    });
}
