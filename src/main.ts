import { NestFactory } from '@nestjs/core';
import * as jsonfile from 'jsonfile';
import { AppModule } from './app.module';

const FILE = 'plugins.json';

async function resolveImport(name) {
  return new Promise(resolve => resolve(import(`./${name}/${name}.module.js`)));
}

async function getPlugins() {
  const plugins = [];
  const fileData = jsonfile.readFileSync(FILE);

  for (const pluginDetail of fileData.plugins) {
    const plugin = await resolveImport(pluginDetail.path);
    plugins.push(plugin[pluginDetail.name]);
  }

  return new Promise(resolve => resolve(plugins));
}

async function bootstrap() {
  const plugins = await getPlugins();
  const currentModules = Reflect.getOwnMetadata('imports', AppModule);
  Reflect.defineMetadata('imports', currentModules.concat(plugins), AppModule);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
