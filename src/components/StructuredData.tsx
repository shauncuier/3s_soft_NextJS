"use client";

import Script from "next/script";

interface StructuredDataProps {
    data: Record<string, any>;
    id?: string;
}

const StructuredData = ({ data, id = "structured-data" }: StructuredDataProps) => {
    return (
        <Script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            strategy="afterInteractive"
        />
    );
};

export default StructuredData;
