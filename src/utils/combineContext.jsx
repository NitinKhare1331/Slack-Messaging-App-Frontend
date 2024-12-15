export default function combineContext(...providers) {
    return ({ children }) => {
        return providers.reduceRight((accumulator, CurrentProvider) => {
            <CurrentProvider>
                {accumulator}
            </CurrentProvider>
        }, children) //children is initial value
    };
}

/** 
 * This combines multiple context providor together and returns a single context providor.
 * 
 * <A>
        <B>
            <C>
                <D>
                    {children}
                </D>
            </C>
        </B>
    </A>
 */

/**
 * <Combined>
 *      {children}
 * </Combined>
 */
