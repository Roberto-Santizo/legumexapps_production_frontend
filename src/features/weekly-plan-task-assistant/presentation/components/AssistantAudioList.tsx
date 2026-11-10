import { AssistantAudioError, AssistantAudioGenerating, AssistantAudioPlayer, type AssistantAudio } from "@/features/weekly-plan-task-assistant/weekly-plan-task-assistant";

type Props = {
    audios: AssistantAudio[];
};

export function AssistantAudioList({ audios }: Props) {
    if (audios.length === 0) return null;

    return (
        <div className="space-y-2">
            {audios.map((audio) => {
                if (audio.status === 'generating') return <AssistantAudioGenerating key={audio.id} id={audio.id} />;

                if (audio.status === 'failed') return <AssistantAudioError key={audio.id} message={audio.error} />;

                return <AssistantAudioPlayer key={audio.id} url={audio.url} />;
            })}
        </div>
    )
}
