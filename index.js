import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
    

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ztofhmkkclizvaqshapf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0b2ZobWtrY2xpenZhcXNoYXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyODEzMjAsImV4cCI6MjAyNzg1NzMyMH0.cwBJlxCOd3WniIRXyoTH8jcUOk5OJ8wqFM3ZiD-7HJQ')



async function getData()
{
    const { data, error } = await supabase
        .from('Leaderboard') // table
        .select() // collumn
        if(error)
        {
            console.log(error)
        }
        if(data)
        {
            console.log(data)
            return data
        }
}


async function getLeaderboardInfo()
{
    const LeaderboardInfo = await getData()

    leaderboardList = LeaderboardInfo

    loadLeaderboardInfo()
}

getLeaderboardInfo()


async function submitScore()
{
    const username = document.getElementById('usernameInp').value
    const scoreRounded = score.toFixed(3)
    if(username == '')
    {
        return
    }
    console.log('submitting score')
    console.log(username, scoreRounded)

    document.getElementById('submitBtn').style.display = 'flex'

    const returnStatement = await uploadData(username, scoreRounded)
    console.log(returnStatement)
    document.getElementById('submitBtn').style.display = 'flex'
    if(returnStatement == 'done')
    {
        document.getElementById('submitBtn').style.backgroundColor = '#5ce060'
        document.getElementById('submitBtn').setAttribute('onclick', '() => {}')
        document.getElementById('sbmtBtn').innerHTML = 'Submitted!'

        getLeaderboardInfo()
    }else{
        document.getElementById('submitBtn').style.backgroundColor = '#f54257'
        // document.getElementById('submitBtn').setAttribute('onclick', '() => {}')
        document.getElementById('sbmtBtn').innerHTML = 'Failed, try again'
    }
}

window.submitScore = submitScore;


export async function uploadData(username, score)
{
    const { data, error } = await supabase
        .from('Leaderboard') // table
        .insert([{'username': username, 'score':score}]) // collumn
        .select() // needed or else data is not returned, but insertion still works
        if(error)
        {
            console.log(error)
            return 'error'
        }
        if(data)
        {
            return 'done'
        }
}