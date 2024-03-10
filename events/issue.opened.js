const messageForNewIssues =
  "Thanks for opening a new issue! Please follow our contributing guidelines to make your issue easier to review.";
async function handleIssueOpened({ octokit, payload }) {
  console.log(`Received an issue event for #${payload.issue.number}`);

  try {
    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
      {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.issue.number,
        assignees: ["aialok"],
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.issue.number,
        body: messageForNewIssues,
        headers: {
          "x-github-api-version": "2022-11-28",
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.error(
        `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
      );
    }
    console.error(error);
  }
}

export default handleIssueOpened;
