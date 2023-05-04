import { configFactory, configPropertyFactory as propFactory } from './config-property-factory.js';

type Environment = 'local' | 'test' | 'production';

export const Config = configFactory({
	env: propFactory<Environment>().anyValue(process.env['SECRETS_ENV']).default('production'),
	verbose: propFactory<boolean>(),
	resourcesDir: propFactory<string>().default('secrets'),
	forcePassword: propFactory<string>().nullable(), //.value('teste'),
});

const isTest = Config.env.includes('local', 'test');
if (isTest) {
	Config.resourcesDir.meta.set('secrets_test');
}
