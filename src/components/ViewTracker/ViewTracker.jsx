"use client"
import React, {useEffect} from 'react';

const ViewTracker = ({ articleId }) => {
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const trackView = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/${articleId}`,
                    {
                        method: "POST",
                        signal
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                const data = await response.json();
                console.log('View tracked:', data);

            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error tracking view:', error);
                }
            }
        };

        trackView();

        return () => {
            controller.abort();
        };
    }, [articleId]);

    return null;
};

export default ViewTracker;