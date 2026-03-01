import { useEffect } from 'react'

export function useScrollReveal(dependency = null) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12 }
        )

        const observeElements = () => {
            document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => {
                observer.observe(el)
            })
        }

        // Observe elements immediately
        observeElements()

        // Also set up a MutationObserver to catch elements mounted later (e.g. after API calls)
        const mutationObserver = new MutationObserver(() => {
            observeElements()
        })

        mutationObserver.observe(document.body, { childList: true, subtree: true })

        return () => {
            observer.disconnect()
            mutationObserver.disconnect()
        }
    }, [dependency]) // Re-run if a specific state dependency is passed
}
