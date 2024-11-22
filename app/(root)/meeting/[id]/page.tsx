'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/constants/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <Loader />

    return (
        <main className='h-screen w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {
                        !isSetupComplete ? (
                            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                        ) : (
                            <MeetingRoom />
                        )
                    }
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting