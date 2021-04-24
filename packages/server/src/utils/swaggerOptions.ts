const swaggerOptions = {
	info: {
		version: '1.0.0',
		title: 'PetStore',
		license: {
			name: 'MIT',
		},
	},
	security: {
		BasicAuth: {
			type: 'http',
			scheme: 'basic',
		},
	},
	baseDir: __dirname,
	filesPattern: ['./*.ts', '../routes/api/*.ts'],
	swaggerUIPath: '/api-docs',
	exposeSwaggerUI: true,
	exposeApiDocs: false,
	apiDocsPath: '/v3/api-docs',
	notRequiredAsNullable: false,
	swaggerUiOptions: {},
}

export default swaggerOptions
