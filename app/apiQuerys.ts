import supabase from '@/supabase';
export const getCourse = async (page:number) => {
    try {
        const { data, count, error } = await supabase
            .from("courses")
            .select(
                `id, thumbnail_url, title, description, price, status,category_id,instructor_id, is_active, created_at, updated_at, created_by, updated_by`,
            { count: 'exact' })
            .range(page, 10)
        return {data, count, error};
    } catch (error) {
        console.log(error)
    }
}

