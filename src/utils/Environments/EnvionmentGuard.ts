type Environments = 'development' | 'production'
export const NODE_ENV = (nodeEnv:string | undefined): Environments => {
    const environments: Environments[] = ['development' , 'production']

    if(!(environments as string[]).includes(nodeEnv ?? '')){
        throw new Error(
            `Invalid NODE_ENV: "process.env.NODE_ENV". Allowed values: "${environments.join(',')}"`
            )
    }
    return nodeEnv as Environments
}